export const arhiz = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg', import.meta.url);
export const chelyabinskayzObl = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg', import.meta.url)
export const ivanovo = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg', import.meta.url);
export const kamchatka = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg', import.meta.url);
export const holmogorskiyRayon = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg', import.meta.url);
export const baykal = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg', import.meta.url);


// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content

// @todo: Функция создания карточки
export function createCard(name, link, deleteCard, getLikeCard, openPopupCardImg) {

  const card = cardTemplate.querySelector('.places__item').cloneNode(true)
  const deleteButton = card.querySelector('.card__delete-button')
  const likeButton = card.querySelector('.card__like-button')

  const cardImg = card.querySelector('.card__image')

  cardImg.addEventListener('click', openPopupCardImg)

  card.querySelector('.card__title').textContent = name
  cardImg.src = link
  cardImg.alt = name

  deleteButton.addEventListener('click', deleteCard)
  likeButton.addEventListener('click', getLikeCard)

  return card
}



// @todo: Функция удаления карточки
export function deleteCard(evt) {
  evt.target.closest('.places__item').remove()
}

export function getLikeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active')
}
