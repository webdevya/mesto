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

  clearProgress() {
    this._confirmBtn.textContent = this._defaultSubmitText;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleConfirm();
    });
  }

  open(handleConfirm) {
    this._handleConfirm = handleConfirm;
    super.open();
  }

}
