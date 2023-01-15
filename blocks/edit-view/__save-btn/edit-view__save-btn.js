// Находим форму в DOM
let formElement = document.querySelector('.edit-view__form');

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

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
