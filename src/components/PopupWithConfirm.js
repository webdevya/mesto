import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor({ popupSelector, popupOpenedClass, closeBtnSelector, formSelector }) {
    super({ popupSelector, popupOpenedClass, closeBtnSelector });
    this._form = this._popup.querySelector(formSelector);

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
      this._form.addEventListener('submit', this._confirm);
    else
      this._form.removeEventListener('submit', this._confirm);
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
