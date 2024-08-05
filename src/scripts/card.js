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

  //счетчик лайков
  const countLikes = (item) => {
    likeCount.textContent = item
  }

  countLikes(cardElement.likes.length)

  likeButton.addEventListener('click', (cardElement) => {
    getLikeCard(cardElement, cardId, countLikes)

  })

  //проверка моего лайка
  const MyLike = cardElement.likes.some(({_id}) => {
    return _id === myId
  })

  if(MyLike) {
    likeButton.classList.add('card__like-button_is-active')
  }

  return card
}


// @todo: Функция удаления карточки
export function deleteCard(card, cardId) {
  deleteCardOnServer(cardId)
    .then(() => {
      card.target.closest('.places__item').remove()
    })
    .catch((err) => {
      console.log('Ошибка, запрос не выполнен', err)
    })
}

export function getLikeCard(evt, cardId, countLikes) {
    const likeMethod = !evt.target.classList.contains('card__like-button_is-active') ? setLike : removeLike
  likeMethod(cardId)
  .then((data) => {
    countLikes(data.likes.length)
    evt.target.classList.toggle('card__like-button_is-active')
  })
  .catch(err => console.log(err))
}
