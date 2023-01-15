function closePopup() {
  let view = document.querySelector('.edit-view');
  if (view.classList.contains('edit-view_opened')) {
    view.classList.remove('edit-view_opened');
  }
}


function subscribeCloseEditView() {
  let btnClose = document.querySelector('.edit-view__close-btn');
  if (btnClose != null) {
    btnClose.addEventListener('click', closePopup);
  }
}

subscribeCloseEditView();
