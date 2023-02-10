
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
const cardTemplate = document.querySelector('.elements__card-template').content.querySelector('.elements__card');



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
  }

  submitCallBack = null;
  currentPopup = null;
}

function closeByOverlayClick(evt) {
  if (evt.currentTarget === evt.target) {
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

function fillContentFromInputs(inputs, propertiesMatch) {
  propertiesMatch.forEach(match => {
    let input = inputs.find(inp => inp.name === match.inputName);
    if (input !== null)
      if (match.elementItem !== null)
        match.elementItem.textContent = input.inputElement.value;
  });
}

function fillInputsFromContent(inputs, propertiesMatch) {
  propertiesMatch.forEach(match => {
    let input = inputs.find(inp => inp.name === match.inputName);
    if (input !== null)
      input.inputElement.value = match.elementItem !== null ? match.elementItem.textContent : '';
  });
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



function getFormInputs(popup) {

  const res = [];

  const inputs = popup.querySelectorAll('.popup__input');
  for (let input of inputs) {
    res.push({ name: input.getAttribute('name'), inputElement: input })
  }

  return res;
}


function openPopupImg(evt) {
  evt.preventDefault();

  const img = evt.currentTarget;
  const caption = img.getAttribute('alt');
  const src = img.getAttribute('src');

  _popupViewImgImage.setAttribute('alt', caption);
  _popupViewImgImage.setAttribute('src', src);

  _popupViewImgCaption.textContent = caption;

  OpenPopup(_popupViewImg);

}

function OpenPopup(popup) {
  popup.classList.add('popup_opened');
  currentPopup = popup;
}

function openPopupForm(popup, inputsFiller) {

  const inputs = getFormInputs(popup);

  inputsFiller(inputs)

  OpenPopup(popup);
}

function FillProfileInputs(inputs) {
  fillInputsFromContent(inputs, _profileInputsToElementsMap);
}

function FillAddCardInputs(inputs) {
  fillInputsFromContent(inputs, _cardInputsToElementsMap);
}

function openPopupProfile(evt) {

  submitCallBack = profileSubmitCallBack;

  openPopupForm(_popupProfile, FillProfileInputs);
}

function openPopupAddCard(evt) {

  submitCallBack = addCardSubmitCallBack;

  openPopupForm(_popupAddCard, FillAddCardInputs);
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


function createCard(caption, link) {
  const card = cardTemplate.cloneNode(true);
  const img = card.querySelector('.elements__card-image');
  img.src = link;
  img.alt = caption;
  card.querySelector('.elements__card-caption-text').textContent = caption;

  subscribeOpenImg(img);

  const btnFav = card.querySelector('.elements__card-fav-btn');
  subscribeFav(btnFav);

  const btnTrash = card.querySelector('.elements__card-trash-btn');
  subscribeTrash(btnTrash);

  return card;
}

function addCard(cardProperties, cardsContainer) {

  const card = createCard(cardProperties.name, cardProperties.link);
  cardsContainer.prepend(card);
}

function initStartCards(initialCards) {

  for (let i = initialCards.length - 1; i >= 0; i--) {
    addCard(initialCards[i], _cardsContainer);
  }
}

function subscribeFav(btnFav) {
  btnFav.addEventListener('click', toggleFavState);
}

function subscribeTrash(btnTrash) {
  btnTrash.addEventListener('click', removeCard);
}

function subscribeOpenImg(img) {
  img.addEventListener('click', openPopupImg);
}

function subscribeAllByClass(className, event, func) {
  const elements = document.querySelectorAll(className);
  for (let element of elements) {
    element.addEventListener(event, func);
  }
}

document.addEventListener('keydown', closeByEsc);
_profileBtnEdit.addEventListener('click', openPopupProfile);
_profileBtnAddCard.addEventListener('click', openPopupAddCard);
subscribeAllByClass('.popup__close-btn', 'click', closePopup);
subscribeAllByClass('.popup', 'click', closeByOverlayClick);
subscribeAllByClass('.popup__form', 'submit', handleFormSubmit);

initStartCards(_initialCards);
