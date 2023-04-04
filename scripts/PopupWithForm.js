import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, popupOpenedClass, closeBtnSelector, formSelector, inputSelector }, handleFormSubmit) {
    super({ popupSelector, popupOpenedClass, closeBtnSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(formSelector);
    this._inputs = this._form.querySelectorAll(inputSelector); //'.popup__input'

    this.setEventListeners.bind(this);
    this.close = this.close.bind(this);
  }

  _getInputValues = () => {
    const res = {};
    for (let input of this._inputs) {
      res[input.getAttribute('name')] = input.value;
    }

    return res;
  }

  initInputValues(inputValues) {
    this._inputs.forEach(input => {
      if (inputValues[input.name])
        input.value = inputValues[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  get form() {
    return this._form;
  }
}
