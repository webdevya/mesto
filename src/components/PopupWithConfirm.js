import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor({ popupSelector, popupOpenedClass, closeBtnSelector, confirmBtnSelector }) {
    super({ popupSelector, popupOpenedClass, closeBtnSelector });
    this._confirmBtn = this._popup.querySelector(confirmBtnSelector);

  }

  // setEventListeners() {
  //   super.setEventListeners();
  //   this._form.addEventListener('submit', (evt) => {
  //     evt.preventDefault();
  //     this._handleFormSubmit();
  //     this.close();
  //   });
  // }

  _confirm = (evt) => {
    evt.preventDefault();
    this._handleConfirm();
    this.close();

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

  }


}
