import {initialCards} from './cards.js'
import '../pages/index.css'


// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content


// @todo: DOM узлы
const content = document.querySelector('.content')
const cardContainer = content.querySelector('.places__list')


// @todo: Функция создания карточки
function createCard(name, link, deleteCard) {

  const card = cardTemplate.querySelector('.places__item').cloneNode(true)
  const deleteButton = card.querySelector('.card__delete-button')       

  card.querySelector('.card__title').textContent = name
  card.querySelector('.card__image').src = link
  deleteButton.addEventListener('click', deleteCard)    

  return card
}


// @todo: Функция удаления карточки
function deleteCard(evt) {
  const card = evt.target.closest('.places__item')
  card.remove()
}


// @todo: Вывести карточки на страницу
initialCards.forEach( (cardElement) => {
  cardContainer.append(createCard(cardElement.name, cardElement.link, deleteCard))
})

console.log('Hello!!!')
