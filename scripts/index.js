
const formElement = document.querySelector('.popup__form');
const elementsUl = document.querySelector('.elements__cards')

let submitCallBack = null;

function closePopup() {

  let popups = document.querySelectorAll('.popup');

  for (let i = 0; i < popups.length; i++) {
    if (popups[i].classList.contains('popup_opened')) {
      popups[i].classList.remove('popup_opened');
    }
  }

  submitCallBack = null;
}


function handleFormSubmit(evt) {

  evt.preventDefault();

  let nameInput = formElement.querySelector('.popup__input_item_naming');
  let input2El = formElement.querySelector('.popup__input_item_input2');

  let name = nameInput.value;
  let text = input2El.value;

  if (submitCallBack !== null)
    submitCallBack(name, text);

  closePopup();
}

function profileSubmitCallBack(name, text) {

  let profile = document.querySelector('.profile');
  let nameProfile = profile.querySelector('.profile__name');
  let aboutProfile = profile.querySelector('.profile__about');

  nameProfile.textContent = name;
  aboutProfile.textContent = text;
}


function addCardSubmitCallBack(name, text) {
  addCard(name, text);
}

function toggleFavState(evt) {
  evt.preventDefault();
  let btn = evt.currentTarget;
  btn.classList.toggle('elements__card-fav-btn_state_checked');
}


function openPopupImg(evt) {
  evt.preventDefault();

  let img = evt.currentTarget;
  let caption = img.getAttribute('alt');
  let src = img.getAttribute('src');

  let popup = document.querySelector('.popup_type_img');

  let imgPopup = popup.querySelector('.popup__image');
  imgPopup.setAttribute('alt', caption);
  imgPopup.setAttribute('src', src);

  let imgCaption = popup.querySelector('.popup__image-caption-text');
  imgCaption.textContent = caption;

  popup.classList.add('popup_opened');
}

function openPopupForm(header, input1, input2, placeholder1, placeholder2) {
  let popup = document.querySelector('.popup_type_form');
  popup.classList.add('popup_opened');


  let formElement = document.querySelector('.popup');
  let nameInput = popup.querySelector('.popup__input_item_naming');
  let input2El = popup.querySelector('.popup__input_item_input2');
  let headEl = popup.querySelector('.popup__form-header');

  nameInput.value = input1;
  nameInput.setAttribute('placeholder', placeholder1);

  input2El.value = input2;
  input2El.setAttribute('placeholder', placeholder2);

  headEl.textContent = header;
}

function openPopupProfile(evt) {
  let profile = document.querySelector('.profile');
  let nameProfile = profile.querySelector('.profile__name');
  let aboutProfile = profile.querySelector('.profile__about');

  let name = nameProfile.textContent;
  let about = aboutProfile.textContent;
  let header = 'Редактировать профиль';

  submitCallBack = profileSubmitCallBack;

  openPopupForm(header, name, about, 'Имя', 'О себе');

}

function openPopupAddCard(evt) {

  submitCallBack = addCardSubmitCallBack;

  openPopupForm('Новое место', '', '', 'Название', 'Ссылка на картинку');
}


function removeCard(evt) {
  evt.preventDefault();
  let el = evt.currentTarget;
  let resume = true;
  while (resume) {
    if (!el.classList.contains('elements__card')) {
      el = el.parentElement;
    }
    else {
      resume = false;
      el.remove();
    }
  }
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

function addCard(caption, link) {
  let cardHtml = `<li class="elements__card">
<figure class="elements__card-figure">
  <button type="button" class="elements__card-trash-btn image-btn image-btn_hover-opacity_medium"></button>
  <img class="elements__card-image" src="${link}" alt="${caption}">
  <figcaption class="elements__card-caption">
    <h2 class="elements__card-caption-text">${caption}</h2>
    <button type="button" class="elements__card-fav-btn image-btn image-btn_hover-opacity_low"></button>
  </figcaption>
</figure>
</li>`;
  elementsUl.insertAdjacentHTML("afterbegin", cardHtml);

  let btnFav = elementsUl.querySelector('.elements__card-fav-btn');
  let btnTrash = elementsUl.querySelector('.elements__card-trash-btn');
  let img = elementsUl.querySelector('.elements__card-image');
  subscribeFav(btnFav);
  subscribeTrash(btnTrash);
  subscribeOpenImg(img);
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
    addCard(initialCards[i].name, initialCards[i].link);
  }
}


function subscribeFavs() {
  let btns = document.querySelectorAll('.elements__card-fav-btn');
  for (let i = 0; i < btns.length; i++) {
    let btn = btns[i];
    subscribeFav(btn);
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

function subscribeOpenImgs() {
  let imgs = document.querySelectorAll('.elements__card-image');
  for (let i = 0; i < imgs.length; i++) {
    let img = imgs[i];
    subscribeOpenImg(img);
  }
}


function subscribeTrashes() {
  let btns = document.querySelectorAll('.elements__card-trash-btn');
  for (let i = 0; i < btns.length; i++) {
    let btn = btns[i];
    subscribeTrash(btn);
  }
}


function subscribeCloseEditView() {
  let btnClose = document.querySelectorAll('.popup__close-btn');
  for (let i = 0; i < btnClose.length; i++) {
    btnClose[i].addEventListener('click', closePopup);
  }
}

function subscribeOpenEditProfileView() {
  let btnEdit = document.querySelector('.profile__edit-btn');
  btnEdit.addEventListener('click', openPopupProfile);
}

function subscribeOpenAddCardView() {
  let btnEdit = document.querySelector('.profile__add-card');
  btnEdit.addEventListener('click', openPopupAddCard);
}

function subscribeCloseByOverlay() {
  let popups = document.querySelectorAll('.popup');

  for (let i = 0; i < popups.length; i++) {
    popups[i].addEventListener('click', closeByOverlayClick);

  }
}

subscribeFavs();
subscribeTrashes();
subscribeOpenImgs()


subscribeOpenEditProfileView();
subscribeOpenAddCardView();
subscribeCloseEditView();
subscribeCloseByOverlay();

formElement.addEventListener('submit', handleFormSubmit);
document.addEventListener('keydown', closeByEsc);

initStartCards();





