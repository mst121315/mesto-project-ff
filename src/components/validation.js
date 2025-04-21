function setEventListeners(formElement, config) {
  const popupInputs = formElement.querySelectorAll(config.inputSelector);
  const button = formElement.querySelector(config.submitButtonSelector);

  popupInputs.forEach((inputElement) => {
    const elementError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.addEventListener("input", function () {
      isValid(inputElement, elementError, config);

      toggleButtonState(popupInputs, button, config);
    });
  });

  toggleButtonState(popupInputs, button, config);
}

function isValid(inputElement, elementError, config) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(elementError, config, inputElement.validationMessage);
    inputElement.classList.add(config.inputErrorClass);
  } else {
    hideInputError(elementError, config);
    inputElement.classList.remove(config.inputErrorClass);
  }
}

function toggleButtonState(popupInputs, button, config) {
  if (hasInvalidInput(popupInputs)) {
    enableButton(button, config);
  } else {
    dsableButton(button, config);
  }
}

function enableButton(button, config) {
  button.disabled = true;
  button.classList.add(config.inactiveButtonClass);
}

function dsableButton(button, config) {
  button.disabled = false;
  button.classList.remove(config.inactiveButtonClass);
}

function hasInvalidInput(inputList) {
  return Array.from(inputList).some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function showInputError(elementError, config, validationMessage) {
  elementError.textContent = validationMessage;
  elementError.classList.add(config.errorClass);
}

function hideInputError(elementError, config) {
  elementError.textContent = "";
  elementError.classList.remove(config.errorClass);
}

export function enableValidation(config) {
  /** включение валидации всех форм */
  const popupForms = document.querySelectorAll(config.formSelector);
  popupForms.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

export function clearValidation(formElement, config) {
  /** очищает ошибки валидации формы и делает кнопку неактивной */
  const button = formElement.querySelector(config.submitButtonSelector);
  dsableButton(button, config);

  const spanElements = Array.from(
    formElement.getElementsByClassName(config.errorClass)
  );
  spanElements.forEach((span) => hideInputError(span, config));

  const popupInputs = formElement.querySelectorAll(config.inputSelector);
  popupInputs.forEach((inputElement) =>
    inputElement.classList.remove(config.inputErrorClass)
  );
}
