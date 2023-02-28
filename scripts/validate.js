let form = null;
let inputList = null;
let submitButtonElement = null;
let submitDisableClassName = null;
let inputErrorClassName = null;

function hasInvalidInput(inputList) {
  return inputList.some(input => !input.validity.valid);
}

function toggleButtonState(inputList, buttonElement, submitDisableClass) {
  if (hasInvalidInput(inputList))
    buttonElement.classList.add(submitDisableClass);
  else
    buttonElement.classList.remove(submitDisableClass);
}

function checkInputValidity(formElement, inputElement, inputErrorClass) {
  toggleInputError(formElement, inputElement, inputErrorClass, inputElement.validationMessage);
}

function toggleInputSubscription(inputList, isSubscribe) {

  inputList.forEach((inputElement) => {
    if (isSubscribe) {
      inputElement.addEventListener('input', handleInput);
    }
    else {
      inputElement.removeEventListener('input', handleInput);
    }
  });
}

function toggleInputError(formElement, inputElement, inputErrorClass, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (errorMessage.length > 0)
    inputElement.classList.add(inputErrorClass);
  else
    inputElement.classList.remove(inputErrorClass);

  errorElement.textContent = errorMessage;
}

function handleInput(evt) {
  checkInputValidity(form, evt.currentTarget, inputErrorClassName);
  toggleButtonState(inputList, submitButtonElement, submitDisableClassName);
}


function enableValidation(config) {
  form = document.forms[config.formName];
  if (form !== null) {
    inputList = Array.from(form.querySelectorAll(config.inputSelector));
    submitButtonElement = form.querySelector(config.submitButtonSelector);
    submitDisableClassName = config.inactiveButtonClass;
    inputErrorClassName = config.inputErrorClass;

    toggleInputSubscription(inputList, true);
    toggleButtonState(inputList, submitButtonElement, submitDisableClassName);
  }
}

function disableValidation() {
  if (inputList !== null)
    toggleInputSubscription(inputList, false);
}

