/**
 * функция открытия попапа новой карточки
 */
function openPopup(popup) {
  popup.classList.add("popup_is-opened");

  document.addEventListener("keydown", closePopupEsc);
  popup.addEventListener("click", handleClosePopup);
}

/**
 * колбэк функция закрытия попапа 
 */
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", closePopupEsc);
  popup.removeEventListener("click", handleClosePopup);
}

/**
 * закрытие кнопкой Esc
 */
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    if (popup) {
      closePopup(popup);
    }
  }
}

function handleClosePopup(evt) {
  if (evt.target.classList.contains("popup")) {
    /** закрытие по оверлею */ 
    closePopup(evt.target);
  }
  if (evt.target.classList.contains("popup__close")) {
    /** закрытие по крестику */
    closePopup(evt.target.closest(".popup"));
  }
}

export { openPopup };
export { closePopup };
