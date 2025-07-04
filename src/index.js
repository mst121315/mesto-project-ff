import "./pages/index.css";

import { createCard } from "./components/card.js";
import { openPopup } from "./components/modal.js";
import { closePopup } from "./components/modal.js";

import { clearValidation } from "./components/validation.js";
import { enableValidation } from "./components/validation.js";

import {
  getInitialCards,
  getProfile,
  updateProfile,
  addNewCard,
  processLike,
  processDelete,
  updateAvatar,
} from "./components/api.js";

let myId = null;

const profileAddButton = document.querySelector(".profile__add-button"); // кнопка +
const editButton = document.querySelector(".profile__edit-button"); // кнопка редактировать профиль
const formEditProfile = document.querySelector("#edit-profile-form");
const formNewCard = document.querySelector("#new-card-form");

const addPopup = document.querySelector(".popup_type_new-card"); // попап новой карточки
const editProfilePopup = document.querySelector(".popup_type_edit"); // попап редактирования профиля

const cardsContainer = document.querySelector(".places__list");

/** Темплейт карточки */
const cardTemplate = document.querySelector("#card-template").content;

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaptionImage = popupTypeImage.querySelector(".popup__caption");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileImage = document.querySelector(".profile__image");

const newCardName = document.querySelector("#place-name");
const newCardJob = document.querySelector("#link");

/** Аватар */
const popupTypeAvatar = document.querySelector(".popup_type_avatar");
const buttonProfileAddAvatar = document.querySelector(".profile__add-avatar");
const avatarForm = document.querySelector("#avatar-form");
const avatarInput = avatarForm.querySelector("#avatar-url");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

/**
 * функция увеличения картинки карточки
 */
function zoom(element) {
  openPopup(popupTypeImage);

  popupImage.src = element.link;
  popupImage.alt = element.name;
  popupCaptionImage.textContent = element.name;
}

function startLoader(el) {
  const button = el.querySelector(".popup__button");
  if (button.dataset.processing) {
    button.disabled = true;
    button.dataset.label = button.textContent;
    button.textContent = button.dataset.processing;
  }
}

function stopLoader(el) {
  const button = el.querySelector(".popup__button");
  if (button.dataset.processing) {
    button.disabled = false;
    button.dataset.processing = button.textContent;
    button.textContent = button.dataset.label;
  }
}

/**
 * Обработчик «отправки» формы
 */
function handleFormSubmitEditProfile(evt) {
  evt.preventDefault();
  startLoader(evt.target);
  updateProfile(nameInput.value, jobInput.value)
    .then((profile) => {
      profileTitle.textContent = profile.name;
      profileDescription.textContent = profile.about;
      closePopup(editProfilePopup);
    })
    .catch((err) => {
      console.error("Произошла ошибка при загрузке данных:", err);
    })
    .finally(() => stopLoader(evt.target));
}

/**
 * функция довавления новой карточки
 */
function handleNewCard(evt) {
  evt.preventDefault();
  startLoader(evt.target);
  addNewCard(newCardName.value, newCardJob.value)
    .then((newElement) => {
      const newCard = createCard(
        newElement,
        cardTemplate,
        zoom,
        myId,
        processLike,
        processDelete
      );
      cardsContainer.prepend(newCard);
      closePopup(addPopup);
    })
    .catch((err) => {
      console.error("Произошла ошибка при загрузке данных:", err);
    }).finally(() => stopLoader(evt.target));;
}

/**
 * функция редактирования профиля
 */
function fillProfile() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function handleAvatarUpdate(evt) {
  evt.preventDefault();
  const newAvatarUrl = avatarInput.value;
  startLoader(evt.target);
  updateAvatar(newAvatarUrl)
    .then((profileData) => {
      profileImage.style.backgroundImage = "url(" + profileData.avatar + ")";
      closePopup(popupTypeAvatar);
    })
    .catch((err) => {
      console.error("Произошла ошибка при загрузке данных:", err);
    })
    .finally(() => stopLoader(evt.target));
}

buttonProfileAddAvatar.addEventListener("click", () => {
  openPopup(popupTypeAvatar);
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
});

profileAddButton.addEventListener("click", () => {
  openPopup(addPopup);
  formNewCard.reset();
  clearValidation(formNewCard, validationConfig);
});

editButton.addEventListener("click", () => {
  openPopup(editProfilePopup);
  fillProfile();
  clearValidation(formEditProfile, validationConfig);
});

Promise.all([getProfile(), getInitialCards()])
  .then(([profileData, cards]) => {
    profileTitle.textContent = profileData.name;
    profileDescription.textContent = profileData.about;
    profileImage.style.backgroundImage = "url(" + profileData.avatar + ")";

    myId = profileData._id;
    cards.forEach((element) => {
      const card = createCard(
        element,
        cardTemplate,
        zoom,
        myId,
        processLike,
        processDelete
      );
      cardsContainer.append(card);
    });
  })
  .catch((err) => {
    console.error("Произошла ошибка при загрузке данных:", err);
  });

formEditProfile.addEventListener("submit", handleFormSubmitEditProfile);
formNewCard.addEventListener("submit", handleNewCard);
avatarForm.addEventListener("submit", handleAvatarUpdate);

enableValidation(validationConfig);
