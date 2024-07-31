export const arhiz = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg', import.meta.url);
export const chelyabinskayzObl = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg', import.meta.url)
export const ivanovo = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg', import.meta.url);
export const kamchatka = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg', import.meta.url);
export const holmogorskiyRayon = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg', import.meta.url);
export const baykal = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg', import.meta.url);

import {deleteCardOnServer} from '../components/api'
import {setLike} from '../components/api'
import {removeLike} from '../components/api'


// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content

// @todo: Функция создания карточки
export function createCard(myId, name, link, likes, deleteCard, getLikeCard, openPopupCardImg, cardElement) {

  const card = cardTemplate.querySelector('.places__item').cloneNode(true)
  const deleteButton = card.querySelector('.card__delete-button')
  const likeButton = card.querySelector('.card__like-button')
  const likeCount = card.querySelector('.card__like_count')

  const cardImg = card.querySelector('.card__image')

  const cardId = cardElement._id

  cardImg.addEventListener('click', openPopupCardImg)

  card.querySelector('.card__title').textContent = name
  cardImg.src = link
  cardImg.alt = name


  if (cardElement.owner._id === myId) {
    deleteButton.addEventListener('click', (cardElement) => {
      deleteCard(cardElement, cardId)
    })
  } else {
    deleteButton.remove();
  }


  const countLikes = (item) => {
    likeCount.textContent = item
  }

  countLikes(cardElement.likes.length)

  likeButton.addEventListener('click', (cardElement) => {
    getLikeCard(cardElement, cardId, countLikes)
  })

  return card
}


// @todo: Функция удаления карточки
export function deleteCard(card, cardId) {
  deleteCardOnServer(cardId)
  card.target.closest('.places__item').remove()
}

export function getLikeCard(evt, cardId, countLikes) {
  if(!evt.target.classList.contains('card__like-button_is-active')){
    setLike(cardId).then((data) => {
      countLikes(data.likes.length)
      evt.target.classList.add('card__like-button_is-active')
    })
  } else {
    removeLike(cardId).then((data) => {
      countLikes(data.likes.length)
      evt.target.classList.remove('card__like-button_is-active')
    })
  }
}
