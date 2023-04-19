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
  //inputNameToCardAttrMap,
  cardContainerSelector,
  profileBtnEdit,
  profileBtnAddCard,
  profileBtnEditAvatar,
  //profileInputsToElementsMap,
  cardTemplate,
  imagePopupSelector,
  profilePopupSelector,
  newCardPopupSelector,
  confirmPopupSelector,
  avatarPopupSelector,
  profileNameElement,
  profileAboutElement,
  profileAvatarElement,
  localUrls
} from '../utils/indexConstants.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
//import { initialCards } from '../utils/cards.js';
import Api from '../components/Api';
import SectionBase from '../components/SectionBase';


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64/',
  headers: {
    authorization: 'fc81dab5-e143-401c-aaf5-84987c8320c2',
    'Content-Type': 'application/json'
  }
}, localUrls);

const currentUser = new UserInfo();
//({ profileNameSelector, profileAboutSelector });
api.getUserInfo().then(res => {
  currentUser.setUserInfo({ name: res.name, about: res.about, avatar: res.avatar, id: res._id, cohort: res.cohort });
  return Promise.resolve({ name: res.name, about: res.about, avatar: res.avatar });
}).then((res) => { userSection.renderItem({ name: res.name, about: res.about, avatar: res.avatar }); })
  .catch(err => console.log(err));

const popups = {
  imgPopup: new PopupWithImage({ popupSelector: imagePopupSelector, ...popupConstants, ...popupImgSelectors }),

  profilePopup: new PopupWithForm({ popupSelector: profilePopupSelector, ...popupConstants, formSelector, inputSelector },
    (inputs) => {
      currentUser.updateUserInfoProps({ name: inputs['profile-name'], about: inputs['profile-about'] });

      api.updateUserProps({ name: currentUser.name, about: currentUser.about })
        .then((res) => { userSection.renderItem({ name: res.name, about: res.about, avatar: currentUser.avatar }); })
        .catch(err => console.log(err));
    }),
  confirmPopup: new PopupWithConfirm({ popupSelector: confirmPopupSelector, ...popupConstants, confirmBtnSelector: formConstants.submitButtonSelector }),
  avatarPopup: new PopupWithForm({ popupSelector: avatarPopupSelector, ...popupConstants, formSelector, inputSelector },
    (inputs) => {
      currentUser.updateAvatar(inputs['profile-avatar']);

      api.updateUserAvatar(currentUser.avatar)
        .then((res) => { userSection.renderItem({ name: currentUser.name, about: currentUser.about, avatar: currentUser.avatar }); })
        .catch(err => console.log(err));
    })
};

const cardsSection = new Section(
  {
    items: api.getInitialCards().catch(err => console.log(err)),
    renderer:
      item => {
        const card = new Card(
          {
            caption: item.name,
            link: item.link,
            id: item._id,
            likes: item.likes.length,
            createDate: item.createdAt,
            isOwner: item.owner._id === currentUser.id,
            isLiked: item.likes.some(x => x._id === currentUser.id)

          },
          cardSelectors,
          cardTemplate,
          {
            handleCardClick: popups.imgPopup.open,
            handleDeleteCard: (card) => {
              popups.confirmPopup.open(() => {
                api.deleteCard(card.id)
                  .then(() => card.removeCard())
                  .catch(err => { console.log(err); })
              });
            },
            handleToggleFavState: (id, del) => {
              return del ? api.deleteLike(id) : api.setLike(id);
            }
          }
        );
        cardsSection.addItem(card.createCard());
      }
  },
  cardContainerSelector);

const userSection = new SectionBase(
  ({ name, about, avatar }) => {
    profileNameElement.textContent = name;
    profileAboutElement.textContent = about;
    if (avatar) {
      profileAvatarElement.src = avatar;
      profileAvatarElement.alt = name;
    }
  }
)

popups.newCardPopup = new PopupWithForm({ popupSelector: newCardPopupSelector, ...popupConstants, formSelector, inputSelector },
  (inputs) => {
    api.addCard({ name: inputs['img-name'], link: inputs['img-link'] })
      .then(res => { cardsSection.renderItem(res); })
      .catch(err => { console.log(err); });
  })

Object.values(popups).forEach(popup => {
  if (popup.form) {
    const validator = new FormValidator(formConstants, popup.form);
    validator.enableValidation();
  }
  popup.setEventListeners();
});

//userSection.renderItem({ name: currentUser.name, about: currentUser.about, avatar: currentUser.avatar });
cardsSection.renderItems();

profileBtnEdit.addEventListener('click', () => {
  popups.profilePopup.initInputValues({ 'profile-name': currentUser.name, 'profile-about': currentUser.about });
  popups.profilePopup.open();
});
profileBtnAddCard.addEventListener('click', () => { popups.newCardPopup.open(); });

profileBtnEditAvatar.addEventListener('click', () => { popups.avatarPopup.open(); });




