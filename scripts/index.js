import Card from './Card.js';
import FormValidator from './FormValidator.js';

//DOM elements
const _cardsContainer = document.querySelector('.elements__cards');
const _profile = document.querySelector('.profile');
const _profileName = _profile.querySelector('.profile__name');
const _profileAbout = _profile.querySelector('.profile__about');
const _profileBtnEdit = document.querySelector('.profile__edit-btn');
const _profileBtnAddCard = document.querySelector('.profile__add-card');
const _popupProfile = document.querySelector('.popup_type_form-profile');
const _popupAddCard = document.querySelector('.popup_type_form-img');
const _popupViewImg = document.querySelector('.popup_type_img');
const _popupViewImgImage = _popupViewImg.querySelector('.popup__image');
const _popupViewImgCaption = _popupViewImg.querySelector('.popup__image-caption-text');
const cardTemplate = document.querySelector('.elements-card-template').content.querySelector('.elements__card');

//input names constatnts
const _popupProfileNameAttrName = 'profile-name';
const _popupProfileAboutAttrName = 'profile-about';
const _popupAddCardNameAttrName = 'img-name';
const _popupAddCardLinkAttrName = 'img-link';

//match input names to domElements
const _profileInputsToElementsMap = [
  {
    inputName: _popupProfileNameAttrName,
    elementItem: _profileName
  },
  {
    inputName: _popupProfileAboutAttrName,
    elementItem: _profileAbout
  }
];

const _cardInputsToElementsMap = [
  {
    inputName: _popupAddCardNameAttrName,
    elementItem: null
  },
  {
    inputName: _popupAddCardLinkAttrName,
    elementItem: null
  }
];

//popup variables
let submitCallBack = null;
let currentPopup = null;

function closePopup() {
  const popup = currentPopup;
  if (popup !== null && popup.classList.contains('popup_opened')) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
    popup.querySelector(formSelector)?.reset();
  }

  submitCallBack = null;
  currentPopup = null;
}

function closeByOverlayClick(evt) {
  if (evt.currentTarget === evt.target && evt.button === 0) {
    closePopup();
  }
}

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    closePopup();
  }
}

function handleFormSubmit(evt) {

  evt.preventDefault();

  if (submitCallBack !== null)
    submitCallBack();

  closePopup();
}

function profileSubmitCallBack() {

  const inputs = getFormInputs(_popupProfile);

  fillContentFromInputs(inputs, _profileInputsToElementsMap);
}

function addCardSubmitCallBack() {
  const inputs = getFormInputs(_popupAddCard);

  const cardData = {};
  inputs.forEach(inp => {
    if (inp.name === _popupAddCardNameAttrName)
      cardData['name'] = inp.inputElement.value;
    else if (inp.name === _popupAddCardLinkAttrName)
      cardData['link'] = inp.inputElement.value;
  }
  );

  addCard(cardData, _cardsContainer);
}

function openPopupImg(evt) {
  evt.preventDefault();

  const img = evt.currentTarget;
  const caption = img.getAttribute('alt');
  const src = img.getAttribute('src');

  _popupViewImgImage.setAttribute('alt', caption);
  _popupViewImgImage.setAttribute('src', src);

  _popupViewImgCaption.textContent = caption;

  openPopup(_popupViewImg);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  currentPopup = popup;
  document.addEventListener('keydown', closeByEsc);
}

function openPopupForm(popup, inputsFiller) {

  const inputs = getFormInputs(popup);
  inputsFiller(inputs);
  openPopup(popup);
}

function fillProfileInputs(inputs) {
  fillInputsFromContent(inputs, _profileInputsToElementsMap);
}

function fillAddCardInputs(inputs) {
  fillInputsFromContent(inputs, _cardInputsToElementsMap);
}

function openPopupProfile(evt) {

  submitCallBack = profileSubmitCallBack;
  openPopupForm(_popupProfile, fillProfileInputs);
}

function openPopupAddCard(evt) {
  submitCallBack = addCardSubmitCallBack;
  openPopupForm(_popupAddCard, fillAddCardInputs);
}

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

function addCard(cardProperties, cardsContainer) {

  const card = new Card(
    {
      link: cardProperties.link,
      caption: cardProperties.name,
      openImagePopupHandler: openPopupImg,
      favHandler: toggleFavState,
      trashHandler: removeCard,
      cardSelectors: cardSelectors
    },
    cardTemplate
  );
  cardsContainer.prepend(card.createCard());
}

function initStartCards(initialCards) {
  for (let i = initialCards.length - 1; i >= 0; i--) {
    addCard(initialCards[i], _cardsContainer);
  }
}

_profileBtnEdit.addEventListener('click', openPopupProfile);
_profileBtnAddCard.addEventListener('click', openPopupAddCard);
subscribeAllByClass('.popup__close-btn', 'click', closePopup);
subscribeAllByClass('.popup', 'mousedown', closeByOverlayClick);
subscribeAllByClass('.popup__form', 'submit', handleFormSubmit);

initStartCards(_initialCards);

Array.from(document.querySelectorAll(formSelector)).forEach(form => {
  const validator = new FormValidator(formConstants, form);
  validator.enableValidation();
});




