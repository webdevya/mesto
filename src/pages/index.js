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
  inputNameToCardAttrMap,
  cardContainerSelector,
  profileBtnEdit,
  profileBtnAddCard,
  profileInputsToElementsMap,
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
  currentUser.setUserInfo({ name: res.name, about: res.about, avatar: res.avatar, id: res.id, cohort: res.cohort });
  Promise.resolve();
}).then(() => { userSection.renderItem({ name: currentUser.name, about: currentUser.about, avatar: currentUser.avatar }); });

const popups = {
  imgPopup: new PopupWithImage({ popupSelector: imagePopupSelector, ...popupConstants, ...popupImgSelectors }),
  profilePopup: new PopupWithForm({ popupSelector: profilePopupSelector, ...popupConstants, formSelector, inputSelector },
    (inputs) => { currentUser.setUserInfo(inputs); }),
};

const cardsSection = new Section(
  {
    items: api.getInitialCards(),
    renderer:
      item => {
        const card = new Card(
          {
            caption: item.name,
            link: item.link,
            id: item.id
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
    profileAvatarElement.src = avatar;
    profileAvatarElement.alt = name;
  }
)

popups.newCardPopup = new PopupWithForm({ popupSelector: newCardPopupSelector, ...popupConstants, formSelector, inputSelector },
  (inputs) => {
    cardsSection.renderItem(inputs);
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
  popups.profilePopup.initInputValues(currentUser.getUserInfo());
  popups.profilePopup.open();
});
profileBtnAddCard.addEventListener('click', () => { popups.newCardPopup.open(); });





