
let formElement = document.querySelector('.edit-view__form');

function closePopup() {
  let view = document.querySelector('.edit-view');
  if (view.classList.contains('edit-view_opened')) {
    view.classList.remove('edit-view_opened');
  }
}



function handleFormSubmit(evt) {
  evt.preventDefault();

  // Находим поля формы в DOM
  let nameInput = formElement.querySelector('#naming');
  let jobInput = formElement.querySelector('#aboutself');

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


function openPopup(evt) {
  evt.preventDefault();
  let view = document.querySelector('.edit-view');
  view.classList.add('edit-view_opened');

  let formElement = document.querySelector('.edit-view__form');
  let nameInput = formElement.querySelector('#naming');
  let jobInput = formElement.querySelector('#aboutself');


  let profile = document.querySelector('.profile');
  let nameProfile = profile.querySelector('.profile__name');
  let aboutProfile = profile.querySelector('.profile__about');

  let name = nameProfile.textContent;
  let about = aboutProfile.textContent;

  nameInput.value = name;
  jobInput.value = about;
}


function subscribeFavs() {
  let btns = document.querySelectorAll('.elements__card-fav-btn')
  for (let i = 0; i < btns.length; i++) {
    let btn = btns[i];
    btn.addEventListener('click', toggleFavState);
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
  btnEdit.addEventListener('click', openPopup);
}

subscribeOpenEditView();
subscribeCloseEditView();
subscribeFavs();

formElement.addEventListener('submit', handleFormSubmit);









