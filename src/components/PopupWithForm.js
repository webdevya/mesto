import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, popupOpenedClass, closeBtnSelector, formSelector, inputSelector, submitBtnSelector }, handleFormSubmit) {
    super({ popupSelector, popupOpenedClass, closeBtnSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(formSelector);
    this._inputs = this._form.querySelectorAll(inputSelector);
    this._submitBtn = this._form.querySelector(submitBtnSelector);
    this._defaultSubmitText = this._submitBtn.textContent;
  }

  _getInputValues = () => {
    const res = {};
    for (let input of this._inputs) {
      res[input.getAttribute('name')] = input.value;
    }

    return res;
  }

  showProgress(progressText) {
    this._submitBtn.textContent = progressText;
  }
  clearProgress() {
    this._submitBtn.textContent = this._defaultSubmitText;
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
