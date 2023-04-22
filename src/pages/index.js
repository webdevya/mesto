import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import {
  formConstants,
  formSelector,
  cardSelectors,
  popupConstants,
  popupImgSelectors,
  inputSelector,
  cardContainerSelector,
  profileBtnEdit,
  profileBtnAddCard,
  profileBtnEditAvatar,
  cardTemplate,
  imagePopupSelector,
  profilePopupSelector,
  newCardPopupSelector,
  confirmPopupSelector,
  avatarPopupSelector,
  profileNameSelector,
  profileAboutSelector,
  profileAvatarSelector,
  localUrls
} from '../utils/indexConstants.js';

import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api';

import {
  getLikesCount,
  getIsUserLiked
} from '../utils/likesHandler.js';


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64/',
  headers: {
    authorization: 'fc81dab5-e143-401c-aaf5-84987c8320c2',
    'Content-Type': 'application/json'
  }
}, localUrls);

const currentUser = new UserInfo({ profileNameSelector, profileAboutSelector, profileAvatarSelector });

const popups = {
  imgPopup: new PopupWithImage({ popupSelector: imagePopupSelector, ...popupConstants, ...popupImgSelectors }),

  profilePopup: new PopupWithForm({ popupSelector: profilePopupSelector, ...popupConstants, formSelector, inputSelector, submitBtnSelector: formConstants.submitButtonSelector },
    (inputs) => {
      popups.profilePopup.showProgress('Сохранение...');

      api.updateUserProps({ name: inputs['profile-name'], about: inputs['profile-about'] })
        .then(res => {
          currentUser.updateUserInfoProps({ name: res.name, about: res.about });
          popups.profilePopup.close();
        })
        .catch(err => console.log(err))
        .finally(() => popups.profilePopup.clearProgress());
    }),
  confirmPopup: new PopupWithConfirm({ popupSelector: confirmPopupSelector, ...popupConstants, confirmBtnSelector: formConstants.submitButtonSelector }),
  avatarPopup: new PopupWithForm({ popupSelector: avatarPopupSelector, ...popupConstants, formSelector, inputSelector, submitBtnSelector: formConstants.submitButtonSelector },
    (inputs) => {
      popups.avatarPopup.showProgress('Сохранение...');

      api.updateUserAvatar(inputs['profile-avatar'])
        .then(res => {
          currentUser.updateAvatar(res.avatar);
          popups.avatarPopup.close();
        })
        .catch(err => console.log(err))
        .finally(() => popups.avatarPopup.clearProgress());
    })
};

function createCardInstance(data) {
  const card = new Card(
    {
      caption: data.name,
      link: data.link,
      id: data._id,
      likes: getLikesCount(data.likes),
      createDate: data.createdAt,
      isOwner: data.owner._id === currentUser.id,
      isLiked: getIsUserLiked(data.likes, currentUser.id)

    },
    cardSelectors,
    cardTemplate,
    {
      handleCardClick: popups.imgPopup.open,
      handleDeleteCard: (card) => {
        popups.confirmPopup.open(() => {
          popups.confirmPopup.showProgress('Удаление...');
          api.deleteCard(card.id)
            .then(() => {
              card.removeCard();
              popups.confirmPopup.close();
            })
            .catch(err => { console.log(err); })
            .finally(() => popups.confirmPopup.clearProgress());
        });
      },
      handleToggleFavState: (id, del) => {
        const likeAction = del ? api.deleteLike(id) : api.setLike(id);
        likeAction
          .then(res => {
            card.toggleFavState(getIsUserLiked(res.likes, currentUser.id));
            card.updateFavCount(getLikesCount(res.likes));
          })
          .catch(err => { console.log(err); })
      }
    }
  );
  return card;
}

const cardsSection = new Section(
  item => {
    const card = createCardInstance(item);
    cardsSection.addItem(card.createCard());
  },
  cardContainerSelector);

popups.newCardPopup = new PopupWithForm({ popupSelector: newCardPopupSelector, ...popupConstants, formSelector, inputSelector, submitBtnSelector: formConstants.submitButtonSelector },
  (inputs) => {
    popups.newCardPopup.showProgress('Создание...');
    api.addCard({ name: inputs['img-name'], link: inputs['img-link'] })
      .then(res => {
        cardsSection.renderItem(res);
        popups.newCardPopup.close();
      })
      .catch(err => { console.log(err); })
      .finally(() => popups.newCardPopup.clearProgress());
  })

Object.values(popups).forEach(popup => {
  if (popup.form) {
    const validator = new FormValidator(formConstants, popup.form);
    validator.enableValidation();
  }
  popup.setEventListeners();
});

profileBtnEdit.addEventListener('click', () => {
  popups.profilePopup.initInputValues(currentUser.getUserInfo());
  popups.profilePopup.open();
});

profileBtnAddCard.addEventListener('click', () => { popups.newCardPopup.open(); });

profileBtnEditAvatar.addEventListener('click', () => { popups.avatarPopup.open(); });

Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
  .then(results => {
    currentUser.setUserInfo({ name: results[0].name, about: results[0].about, avatar: results[0].avatar, id: results[0]._id, cohort: results[0].cohort })
    cardsSection.renderItems(results[1]);
  })
  .catch(err => { console.log(err); });
