const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];


// @todo: Функция создания карточки

function createCard(element, cardTemplate, zoom) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const imageElement = cardElement.querySelector('.card__image');

  imageElement.src = element.link;
  imageElement.alt = element.name;

  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = element.name;
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => deleteCard(cardElement));

  const likeButton = cardElement.querySelector('.card__like-button');    // лайк
  likeButton.addEventListener('click', () => handleLike(likeButton));

  imageElement.addEventListener('click', () => zoom(element));    // zoom

  return cardElement;
}

// @todo: Функция удаления карточки

function deleteCard(cardElement) {
  cardElement.remove();
};

// лайк

function handleLike (likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

export { initialCards };
export { createCard };
export { deleteCard };
export { handleLike };