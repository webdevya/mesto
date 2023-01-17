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


function subscribeOpenEditView() {
  let btnEdit = document.querySelector('.profile__edit-btn');
  btnEdit.addEventListener('click', openPopup);
}

subscribeOpenEditView();

