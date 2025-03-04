// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const contents = document.querySelector(".content");
const cardsContainer = contents.querySelector(".places__list");

// @todo: Функция создания карточки

function createCard(element, deleteCardCallback) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const imageElement = cardElement.querySelector(".card__image");

  imageElement.src = element.link;
  imageElement.alt = element.name;

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = element.name;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCardCallback);

  return cardElement;
}

// @todo: Функция удаления карточки

function deleteCard(event) {
  const listItem = event.target.closest(".places__item");
  listItem.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach((element) => {
  const card = createCard(element, deleteCard);
  cardsContainer.append(card);
});
