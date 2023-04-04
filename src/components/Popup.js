export default class Popup {
  constructor({ popupSelector, popupOpenedClass, closeBtnSelector }) {  // ('popup_opened');  '.popup__close-btn'
    this._popup = document.querySelector(popupSelector);
    this._popupOpenedClass = popupOpenedClass;
    this._closeBtn = this._popup.querySelector(closeBtnSelector);
  }

  open() {
    this._popup.classList.add(this._popupOpenedClass);//('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove(this._popupOpenedClass);//('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape")
      this.close();
  }

  _handleClickByOverlayClose = (evt) => {
    if (evt.currentTarget === evt.target && evt.button === 0)
      this.close();
  }

  setEventListeners() {
    this._closeBtn.addEventListener('click', () => { this.close(); });
    this._popup.addEventListener('mousedown', this._handleClickByOverlayClose);
  }
}
