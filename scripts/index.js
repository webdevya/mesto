

const _cardsContainer = document.querySelector('.elements__cards');
const _profileFormClass = '.popup_type_form-profile';
const _imgFormClass = '.popup_type_form-img';

let submitCallBack = null;

function closePopup() {

  const popups = document.querySelectorAll('.popup');

  for (let popup of popups) {
    if (popup.classList.contains('popup_opened')) {
      popup.classList.remove('popup_opened');
    }
  }

  submitCallBack = null;
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

  const frm = getFormInputs(_profileFormClass);

  const profile = getProfileElements();

  profile.name.textContent = frm.input1.value;
  profile.about.textContent = frm.input2.value;
}


function addCardSubmitCallBack() {
  const frm = getFormInputs(_imgFormClass);
  addCard(frm.input1.value, frm.input2.value, _cardsContainer);
}



function getFormInputs(formClass) {
  const popup = document.querySelector(formClass);
  const input1 = popup.querySelector('.popup__input_item_naming');
  const input2 = popup.querySelector('.popup__input_item_input2');

  const res = new Object();
  res.popup = popup;
  res.input1 = input1;
  res.input2 = input2;

  return res;

}

function getProfileElements() {
  const profile = document.querySelector('.profile');
  const nameProfile = profile.querySelector('.profile__name');
  const aboutProfile = profile.querySelector('.profile__about');

  const res = new Object();
  res.name = nameProfile;
  res.about = aboutProfile;

  return res;
}

function openPopupImg(evt) {
  evt.preventDefault();

  const img = evt.currentTarget;
  const caption = img.getAttribute('alt');
  const src = img.getAttribute('src');

  const popup = document.querySelector('.popup_type_img');

  const imgPopup = popup.querySelector('.popup__image');
  imgPopup.setAttribute('alt', caption);
  imgPopup.setAttribute('src', src);

  const imgCaption = popup.querySelector('.popup__image-caption-text');
  imgCaption.textContent = caption;

  popup.classList.add('popup_opened');
}

function openPopupForm(formClass, input1, input2) {

  const frm = getFormInputs(formClass);
  frm.popup.classList.add('popup_opened');

  frm.input1.value = input1;
  frm.input2.value = input2;
}

function openPopupProfile(evt) {
  const profile = getProfileElements();

  submitCallBack = profileSubmitCallBack;

  openPopupForm(_profileFormClass, profile.name.textContent, profile.about.textContent);

}

function openPopupAddCard(evt) {

  submitCallBack = addCardSubmitCallBack;

  openPopupForm(_imgFormClass, '', '');
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
  const cardTemplate = document.querySelector('.elements__card-template').content;
  const card = cardTemplate.querySelector('.elements__card').cloneNode(true);
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

function addCard(caption, link, cardsContainer) {
  const card = createCard(caption, link);
  cardsContainer.prepend(card);
}


function initStartCards() {
  const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];


  for (let i = initialCards.length - 1; i >= 0; i--) {
    addCard(initialCards[i].name, initialCards[i].link, _cardsContainer);
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


function subscribeCloseEditView() {
  subscribeAllByClass('.popup__close-btn', 'click', closePopup);
}

function subscribeOpenEditProfileView() {
  const btnEdit = document.querySelector('.profile__edit-btn');
  btnEdit.addEventListener('click', openPopupProfile);
}

function subscribeOpenAddCardView() {
  const btnEdit = document.querySelector('.profile__add-card');
  btnEdit.addEventListener('click', openPopupAddCard);
}

function subscribeCloseByOverlay() {
  subscribeAllByClass('.popup', 'click', closeByOverlayClick);
}

function subscribeSubmit() {
  subscribeAllByClass('.popup__form', 'submit', handleFormSubmit);
}

function subscribeAllByClass(className, event, func) {
  const elements = document.querySelectorAll(className);
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(event, func);
  }
}


subscribeOpenEditProfileView();
subscribeOpenAddCardView();
subscribeCloseEditView();
subscribeCloseByOverlay();
subscribeSubmit();

document.addEventListener('keydown', closeByEsc);

initStartCards();





