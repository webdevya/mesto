
const formSelector = '.popup__form';
const inputSelector = '.popup__input';
const cardContainerSelector = '.elements__cards';

const formConstants = {
  inputSelector,
  submitButtonSelector: '.popup__save-btn',
  submitDisableClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorTextSelector: '.popup__error'
};


const cardSelectors = {
  favBtnSelector: '.elements__card-fav-btn',
  trashBtnSelector: '.elements__card-trash-btn',
  captionSelector: '.elements__card-caption-text',
  imageSelector: '.elements__card-image'
};

const popupConstants = {
  popupOpenedClass: 'popup_opened',
  closeBtnSelector: '.popup__close-btn'
};

const imagePopupSelector = '.popup_type_img';
const profilePopupSelector = '.popup_type_form-profile';
const newCardPopupSelector = '.popup_type_form-img';

const popupImgSelectors = {
  popupViewImgSelector: '.popup__image',
  popupViewImgCaptionSelector: '.popup__image-caption-text'
}

const inputNameToCardAttrMap = [
  { inputName: 'img-name', cardAttr: 'name' },
  { inputName: 'img-link', cardAttr: 'link' }
];


const profileNameSelector = '.profile__name';
const profileAboutSelector = '.profile__about';

const _profile = document.querySelector('.profile');
const _profileName = _profile.querySelector(profileNameSelector);
const _profileAbout = _profile.querySelector(profileAboutSelector);
const profileBtnEdit = document.querySelector('.profile__edit-btn');
const profileBtnAddCard = document.querySelector('.profile__add-card');

const profileInputsToElementsMap = [
  { inputName: 'profile-name', elementItem: _profileName },
  { inputName: 'profile-about', elementItem: _profileAbout }
];

const cardTemplate = document.querySelector('.elements-card-template').content.querySelector('.elements__card');

export {
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
};
