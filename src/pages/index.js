import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
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
  //profileInputsToElementsMap,
  cardTemplate,
  imagePopupSelector,
  profilePopupSelector,
  newCardPopupSelector,
  profileNameElement,
  profileAboutElement,
  profileAvatarElement,
  localUrls
} from '../utils/indexConstants.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards } from '../utils/cards.js';
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
          popups.imgPopup.open
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





