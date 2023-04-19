import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor({ popupSelector, popupOpenedClass, closeBtnSelector, confirmBtnSelector }) {
    super({ popupSelector, popupOpenedClass, closeBtnSelector });
    this._confirmBtn = this._popup.querySelector(confirmBtnSelector);
    this._defaultSubmitText = this._confirmBtn.textContent;
  }

  showProgress(progressText) {
    this._confirmBtn.textContent = progressText;
  }
  _confirm = (evt) => {
    evt.preventDefault();
    this._handleConfirm();
  }

  _toggleSubmitListener(set) {
    if (set)
      this._confirmBtn.addEventListener('click', this._confirm);
    else
      this._confirmBtn.removeEventListener('click', this._confirm);
  }

  open(handleConfirm) {
    this._handleConfirm = handleConfirm;
    this._toggleSubmitListener(true);
    super.open();
  }

  close() {
    this._toggleSubmitListener(false);
    super.close();
    this._confirmBtn.textContent = this._defaultSubmitText;
  }
}
