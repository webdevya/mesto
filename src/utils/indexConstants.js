
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
  imageSelector: '.elements__card-image',
  favCountSelector: '.elements__card-fav-count',
  favBtnChekedClass: 'elements__card-fav-btn_state_checked'
};

const popupConstants = {
  popupOpenedClass: 'popup_opened',
  closeBtnSelector: '.popup__close-btn'
};

const imagePopupSelector = '.popup_type_img';
const profilePopupSelector = '.popup_type_form-profile';
const newCardPopupSelector = '.popup_type_form-img';
const confirmPopupSelector = '.popup_type_confirm';
const avatarPopupSelector = '.popup_type_form-avatar'

const popupImgSelectors = {
  popupViewImgSelector: '.popup__image',
  popupViewImgCaptionSelector: '.popup__image-caption-text'
}

// const inputNameToCardAttrMap = [
//   { inputName: 'img-name', cardAttr: 'name' },
//   { inputName: 'img-link', cardAttr: 'link' }
// ];


const profileNameSelector = '.profile__name';
const profileAboutSelector = '.profile__about';
const profileAvatarSelector = '.profile__avatar';

const _profile = document.querySelector('.profile');
const profileNameElement = _profile.querySelector(profileNameSelector);
const profileAboutElement = _profile.querySelector(profileAboutSelector);
const profileAvatarElement = _profile.querySelector(profileAvatarSelector);
const profileBtnEdit = document.querySelector('.profile__edit-btn');
const profileBtnAddCard = document.querySelector('.profile__add-card');
const profileBtnEditAvatar = document.querySelector('.profile__edit-avatar-btn');

// const profileInputsToElementsMap = [
//   { inputName: 'profile-name', elementItem: profileNameElement },
//   { inputName: 'profile-about', elementItem: profileAboutElement }
// ];

const cardTemplate = document.querySelector('.elements-card-template').content.querySelector('.elements__card');

const localUrls = { cardLocalUrl: 'cards', cardLikeLocalUrl: 'likes', userLocalUrl: 'users/me', userAvatarLocalUrl: 'users/me/avatar' }

export {
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
  profileNameSelector,
  profileAboutSelector,
  profileAvatarSelector,
  localUrls
};
