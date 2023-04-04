class FormValidator {
  constructor(validationConfig, form) {
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._submitDisableClass = validationConfig.submitDisableClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorTextSelector = validationConfig.errorTextSelector;
    this._form = form;
  }

  _hasInvalidInput() {
    return !this._form.checkValidity();
  }

  _toggleButtonState(buttonElement, submitDisableClass, disable) {

    buttonElement.disabled = disable;
    if (buttonElement.disabled) {
      buttonElement.classList.add(submitDisableClass);
    }
    else {
      buttonElement.classList.remove(submitDisableClass);
    }
  }

  _checkInputValidity(inputElement, inputErrorClass) {
    this._toggleInputError(inputElement, inputErrorClass, inputElement.validationMessage);
  }

  _toggleInputError(inputElement, inputErrorClass, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    if (errorMessage.length > 0)
      inputElement.classList.add(inputErrorClass);
    else
      inputElement.classList.remove(inputErrorClass);

    errorElement.textContent = errorMessage;
  }

  enableValidation() {
    this._submitButtonElement = this._form.querySelector(this._submitButtonSelector);
    this._subscribeInputs(this._inputErrorClass, this._submitDisableClass);
    this._subscribeReset(this._submitDisableClass, this._errorTextSelector);
    this._toggleButtonState(this._submitButtonElement, this._submitDisableClass, this._hasInvalidInput());
  }

  _subscribeReset(submitDisableClass, errorTextSelector) {
    this._form.addEventListener('reset', () => {
      this._clearErrors(errorTextSelector);
      this._toggleButtonState(this._submitButtonElement, submitDisableClass, true);
    });
  }

  _clearErrors(errorTextSelector) {
    this._form.querySelectorAll(errorTextSelector).forEach(err => { err.textContent = '' });
  }

  _subscribeInputs(inputErrorClass, submitDisableClass) {
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    inputList.forEach((inputElement) => {

      inputElement.addEventListener('input', (evt) => {
        this._checkInputValidity(inputElement, inputErrorClass);
        this._toggleButtonState(this._submitButtonElement, submitDisableClass, this._hasInvalidInput());

      });
    });
  }
}

export default FormValidator;
