const pattern = /^[A-Za-zА-Яа-яЁё \-]+$/;
let config = {}

function setEventListeners(formElement) {
  const popupInputs = formElement.querySelectorAll(config.inputSelector);

  popupInputs.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
    });
  });
};

function checkInputValidity(formElement, inputElement) {
    const button = formElement.querySelector(config.submitButtonSelector);
    button.disabled = false;
    const isValid = isInputValid(inputElement)
    if (!isValid) {
        button.classList.add(config.inactiveButtonClass);
        button.disabled = true;
    }
  };

  function isInputValid(inputElement)
  {
    setValidationMessage(inputElement, '');
    let isValid = false;
    if(!inputElement.validity.valid) {
        setValidationMessage(inputElement, inputElement.validationMessage)
    }
    else if(inputElement.dataset.validateSymbols && !pattern.test(inputElement.value)) {
        setValidationMessage(inputElement, inputElement.dataset.errorMessage)
    }
    else {
        isValid = true
    }

    return isValid;
  }

function setValidationMessage(inputElement, message) {
    const span = inputElement.nextElementSibling;
    if(message) {
        span.classList.add(config.errorClass);               //need to add styles
        inputElement.classList.add(config.inputErrorClass)
    }
    else {
        inputElement.classList.remove(config.inputErrorClass)
    }
    span.textContent = message;
};

export function enableValidation(validationConfig) {  // включение валидации всех форм
    config = validationConfig;
    const popupForms = document.querySelectorAll(config.formSelector);

    popupForms.forEach((formElement) => {
        setEventListeners(formElement);
    });
};

export function clearValidation(formElement, validationConfig) {  // очищает ошибки валидации формы и делает кнопку неактивной
    const button = formElement.querySelector(validationConfig.submitButtonSelector);
    button.disabled = true;
    const spanElements = Array.from(formElement.getElementsByClassName(validationConfig.errorClass));
    spanElements.forEach((span) => {
        span.textContent = '';
        span.classList.remove(validationConfig.errorClass);
    })
};