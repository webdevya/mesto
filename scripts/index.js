
let formElement = document.querySelector('.edit-view__form');
let elementsUl = document.querySelector('.elements__cards')
function closePopup() {
  let view = document.querySelector('.edit-view');
  if (view.classList.contains('edit-view_opened')) {
    view.classList.remove('edit-view_opened');
  }
}



function handleFormSubmit(evt) {
  evt.preventDefault();

  // Находим поля формы в DOM


  let nameInput = formElement.querySelector('#edit-view__naming');
  let jobInput = formElement.querySelector('#edit-view__input2');


  // Получите значение полей jobInput и nameInput из свойства value
  let name = nameInput.value;
  let about = jobInput.value;

  let profile = document.querySelector('.profile');
  let nameProfile = profile.querySelector('.profile__name');
  let aboutProfile = profile.querySelector('.profile__about');

  nameProfile.textContent = name;
  aboutProfile.textContent = about;

  closePopup();
}

function toggleFavState(evt) {
  evt.preventDefault();
  let btn = evt.currentTarget;
  btn.classList.toggle('elements__card-fav-btn_state_checked');
}

function openPopup(header, input1, input2, placeholder1, placeholder2) {
  let view = document.querySelector('.edit-view');
  view.classList.add('edit-view_opened');

  let formElement = document.querySelector('.edit-view');
  let nameInput = formElement.querySelector('#edit-view__naming');
  let input2El = formElement.querySelector('#edit-view__input2');
  let headEl = formElement.querySelector('.edit-view__form-header');

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
  openPopup(header, name, about, 'Имя', 'О себе')

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
    btn.addEventListener('click', toggleFavState);
  }
}


function subscribeTrashes() {
  let btns = document.querySelectorAll('.elements__card-trash-btn');
  for (let i = 0; i < btns.length; i++) {
    let btn = btns[i];
    btn.addEventListener('click', removeCard);
  }
}


function subscribeCloseEditView() {
  let btnClose = document.querySelector('.edit-view__close-btn');
  if (btnClose != null) {
    btnClose.addEventListener('click', closePopup);
  }
}

function subscribeOpenEditView() {
  let btnEdit = document.querySelector('.profile__edit-btn');
  btnEdit.addEventListener('click', openPopupProfile);
}

subscribeOpenEditView();
subscribeCloseEditView();



formElement.addEventListener('submit', handleFormSubmit);

initStartCards();
subscribeTrashes();
subscribeFavs();






