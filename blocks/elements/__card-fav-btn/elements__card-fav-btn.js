function toggleFavState(evt) {
  let btn = evt.currentTarget;
  btn.classList.toggle('elements__card-fav-btn_state_checked');
}

function initFavsSubscription() {
  let btns = document.querySelectorAll('.elements__card-fav-btn')
  for (let i = 0; i < btns.length; i++) {
    let btn = btns[i];
    btn.addEventListener('click', toggleFavState);
  }

}

initFavsSubscription();
