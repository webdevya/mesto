class FormValidator {
  constructor(data, form) {
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._submitDisableClass = data.submitDisableClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorTextSelector = data.errorTextSelector;
    this._form = form;
  }


  _hasInvalidInput(form) {
    return !form.checkValidity();
  }

  _toggleButtonState(buttonElement, submitDisableClass, disable) {

    buttonElement.disabled = disable;//this._hasInvalidInput(form);
    if (buttonElement.disabled) {
      buttonElement.classList.add(submitDisableClass);
    }
    else {
      buttonElement.classList.remove(submitDisableClass);
    }
  }

  _checkInputValidity(formElement, inputElement, inputErrorClass) {
    this._toggleInputError(formElement, inputElement, inputErrorClass, inputElement.validationMessage);
  }

  _toggleInputError(formElement, inputElement, inputErrorClass, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    if (errorMessage.length > 0)
      inputElement.classList.add(inputErrorClass);
    else
      inputElement.classList.remove(inputErrorClass);

    errorElement.textContent = errorMessage;
  }


  enableValidation() {

    const submitButtonElement = this._form.querySelector(this._submitButtonSelector);
    this._subscribeInputs(this._form, submitButtonElement, this._inputErrorClass, this._submitDisableClass);
    this._subscribeReset(this._form, submitButtonElement, this._submitDisableClass, this._errorTextSelector);
    this._toggleButtonState(submitButtonElement, this._submitDisableClass, this._hasInvalidInput(this._form));

  }

  _subscribeReset(formElement, submitButtonElement, submitDisableClass, errorTextSelector) {
    formElement.addEventListener('reset', () => {
      this._clearErrors(formElement, errorTextSelector);
      this._toggleButtonState(submitButtonElement, submitDisableClass, true);
    });
  }

  _clearErrors(formElement, errorTextSelector) {
    formElement.querySelectorAll(errorTextSelector).forEach(err => { err.textContent = '' });
  }

  _subscribeInputs(formElement, submitButtonElement, inputErrorClass, submitDisableClass) {
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    inputList.forEach((inputElement) => {

      inputElement.addEventListener('input', (evt) => {
        this._checkInputValidity(formElement, inputElement, inputErrorClass);
        this._toggleButtonState(submitButtonElement, submitDisableClass, this._hasInvalidInput(formElement));

      });
    });
  }
}

export default FormValidator;
