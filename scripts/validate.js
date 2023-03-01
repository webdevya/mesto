
function hasInvalidInput(inputList) {
  return inputList.some(input => !input.validity.valid);
}

function toggleButtonState(inputList, buttonElement, submitDisableClass) {

  buttonElement.disabled = hasInvalidInput(inputList);
  if (buttonElement.disabled) {
    buttonElement.classList.add(submitDisableClass);
  }
  else {
    buttonElement.classList.remove(submitDisableClass);
  }
}

function checkInputValidity(formElement, inputElement, inputErrorClass) {
  toggleInputError(formElement, inputElement, inputErrorClass, inputElement.validationMessage);
}

function toggleInputError(formElement, inputElement, inputErrorClass, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (errorMessage.length > 0)
    inputElement.classList.add(inputErrorClass);
  else
    inputElement.classList.remove(inputErrorClass);

  errorElement.textContent = errorMessage;
}


function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach(form => {
    inputList = Array.from(form.querySelectorAll(config.inputSelector));
    submitButtonElement = form.querySelector(config.submitButtonSelector);
    subscribeInputs(form, inputList, submitButtonElement, config.inputErrorClass, config.submitDisableClass)
    toggleButtonState(inputList, submitButtonElement, config.submitDisableClassName);
  });
}

function subscribeInputs(formElement, inputList, submitButtonElement, inputErrorClass, submitDisableClass) {

  inputList.forEach((inputElement) => {

    inputElement.addEventListener('input', (evt) => {
      checkInputValidity(formElement, inputElement, inputErrorClass);
      toggleButtonState(inputList, submitButtonElement, submitDisableClass);

    });
  });
}

