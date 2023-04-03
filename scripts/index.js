import Card from './Card.js';
import FormValidator from './FormValidator.js';
import PopupWithImage from './PopupWithImage.js';
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
  profileNameSelector,
  profileAboutSelector
} from './constants/indexConstants.js';
import PopupWithForm from './PopupWithForm.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';
import { initialCards } from './constants/cards.js';

function toggleFavState(evt) {
  evt.preventDefault();
  const btn = evt.currentTarget;
  btn.classList.toggle('elements__card-fav-btn_state_checked');
}

function removeCard(evt) {
  const el = evt.currentTarget;
  const card = el.closest('.elements__card');
  card.remove();
}


const currentUser = new UserInfo({ profileNameSelector, profileAboutSelector });

const popups = {
  imgPopup: new PopupWithImage({ popupSelector: imagePopupSelector, ...popupConstants, ...popupImgSelectors }),
  profilePopup: new PopupWithForm({ popupSelector: profilePopupSelector, ...popupConstants, formSelector, inputSelector },
    (inputs) => { currentUser.setUserInfo(inputs); }),
};

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: item => {
      const card = new Card(
        {
          caption: item['img-name'],//.name,
          link: item['img-link']//.link,
        },
        cardSelectors,
        cardTemplate,
        {
          openImagePopupHandler: popups.imgPopup.open,
          favHandler: toggleFavState,
          trashHandler: removeCard
        }
      );

      cardsSection.addItem(card.createCard());
    }
  },
  cardContainerSelector);

popups.newCardPopup = new PopupWithForm({ popupSelector: newCardPopupSelector, ...popupConstants, formSelector, inputSelector },
  (inputs) => {
    // const cardData = {};
    // inputNameToCardAttrMap.forEach(pair => {
    //   cardData[pair.cardAttr] = inputs[pair.inputName];
    // });

    cardsSection.renderItem(inputs);//(cardData);
  })

Object.values(popups).forEach(popup => {
  if (popup.form) {
    const validator = new FormValidator(formConstants, popup.form);
    validator.enableValidation();
  }
  popup.setEventListeners();
});


cardsSection.renderItems();

profileBtnEdit.addEventListener('click', () => {
  // const inputs = {};
  // profileInputsToElementsMap.forEach(match => {
  //   inputs[match.inputName] = match.elementItem.textContent;
  // });
  popups.profilePopup.initInputValues(currentUser.getUserInfo());
  popups.profilePopup.open();
});
profileBtnAddCard.addEventListener('click', popups.newCardPopup.open);





