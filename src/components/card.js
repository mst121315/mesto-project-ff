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

  export { createCard };
