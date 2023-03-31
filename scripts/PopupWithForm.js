import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, popupOpenedClass, closeBtnSelector, formSelector, inputSelector }, handleFormSubmit) {
    super({ popupSelector, popupOpenedClass, closeBtnSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._form = super._popup.querySelector(formSelector);
    this._inputs = this._form.querySelectorAll(inputSelector); //'.popup__input'

  }


  // _traverseInputs(traversalAction) {

  //   for (let input of this._inputs) {
  //     traversalAction(input);
  //   }
  // }

  _getInputValues() {
    const res = [];
    // _traverseInputs(input => {
    //   res.push({ name: input.getAttribute('name'), value: input.value });
    // });

    // const inputs = this._form.querySelectorAll(this._inputSelector); //'.popup__input'
    for (let input of this._inputs) {
      res.push({ name: input.getAttribute('name'), value: input.value })
    }

    return res;
  }

  initInputValues(inputValues) {
    inputValues.forEach(initial => {
      this._inputs[initial.name].value = initial.value;
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
}
