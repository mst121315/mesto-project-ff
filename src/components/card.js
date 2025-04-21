function createCard(
  element,
  cardTemplate,
  zoom,
  myId,
  processLike,
  processDelete
) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const imageElement = cardElement.querySelector(".card__image");
  const likeCountElement = cardElement.querySelector(".like-count");

  likeCountElement.textContent = element.likes.length;
  imageElement.src = element.link;
  imageElement.alt = element.name;
  const cardId = element._id;

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = element.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (element.owner._id == myId) {
    deleteButton.addEventListener("click", () =>
      deleteCard(cardElement, processDelete, cardId)
    );
  } else {
    deleteButton.remove();
  }

  const likeButton = cardElement.querySelector(".card__like-button"); // лайк
  likeButton.addEventListener("click", () =>
    handleLike(likeButton, processLike, likeCountElement, cardId)
  );
  if (element.likes.some((user) => user._id === myId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  imageElement.addEventListener("click", () => zoom(element)); // zoom

  return cardElement;
}

function deleteCard(cardElement, processDelete, cardId) {
  processDelete(cardId)
    .then(() => cardElement.remove())
    .catch((err) => {
      console.error("Произошла ошибка при загрузке данных:", err);
    });
}

function handleLike(likeButton, processLike, likeCountElement, cardId) {
  processLike(
    !likeButton.classList.contains("card__like-button_is-active"),
    cardId
  )
    .then((element) => {
      likeButton.classList.toggle("card__like-button_is-active");
      likeCountElement.textContent = element.likes.length;
    })
    .catch((err) => {
      console.error("Произошла ошибка при загрузке данных:", err);
    });
}

export { createCard };
