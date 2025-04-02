import './pages/index.css';
import avatar from './images/avatar.jpg';

import { initialCards } from './components/cards.js';

import { createCard } from './components/card.js';

import { openPopup } from './components/modal.js';
import { closePopup } from './components/modal.js';


const profileAddButton = document.querySelector('.profile__add-button'); // кнопка +
const editButton = document.querySelector('.profile__edit-button'); // кнопка редактировать профиль
const formEditProfile = document.querySelector('#edit-profile-form');
const formNewCard = document.querySelector('#new-card-form');

const addPopup = document.querySelector('.popup_type_new-card'); // попап новой карточки
const editProfilePopup = document.querySelector('.popup_type_edit'); // попап редактирования профиля

const cardsContainer = document.querySelector('.places__list'); 


// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image'); 
const popupCaptionImage = popupTypeImage.querySelector('.popup__caption');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileImage = document.querySelector('.profile__image');

const newCardName = document.querySelector('#place-name');
const newCardJob= document.querySelector('#link');

// функция увеличения картинки карточки
function zoom (element) {
  openPopup(popupTypeImage);

  popupImage.src = element.link;
  popupImage.alt = element.name;
  popupCaptionImage.textContent = element.name;
}

// Обработчик «отправки» формы 
function handleFormSubmitEditProfile(evt) {
  evt.preventDefault();
  
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(evt.target.closest(".popup"));
}

// функция довавления новой карточки
function handleNewCard (evt) {
  evt.preventDefault();
  
  const element = {name: newCardName.value, link: newCardJob.value};
  const cardsContainer = document.querySelector('.places__list');
  const newCard = createCard(element, cardTemplate, zoom);

  cardsContainer.prepend(newCard);
  formNewCard.reset();
  closePopup(evt.target.closest(".popup"));
}

// функция редактирования профиля
function fillProfile () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

profileImage.style.backgroundImage = `url(${avatar})`;

profileAddButton.addEventListener('click', () => openPopup(addPopup));
editButton.addEventListener('click', () => {
  openPopup(editProfilePopup);
  fillProfile();
  });

// Вывести карточки на страницу
initialCards.forEach((element) => {
  const card = createCard(element, cardTemplate, zoom);
  cardsContainer.append(card);
});

formEditProfile.addEventListener('submit', handleFormSubmitEditProfile);

formNewCard.addEventListener('submit', handleNewCard);
