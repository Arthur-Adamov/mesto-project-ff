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


// function openCardImg(evt) {
//   const card = evt.target.closest('.card')
//   card.classList.add('card__image')
// }



// @todo: Функция удаления карточки
function deleteCard(evt) {
  const card = evt.target.closest('.places__item')
  card.remove()
}


// @todo: Вывести карточки на страницу
initialCards.forEach( (cardElement) => {
  cardContainer.append(createCard(cardElement.name, cardElement.link, deleteCard))
})



const popupEditProfile = document.querySelector('.popup_type_edit')
const popupNewCard = document.querySelector('.popup_type_new-card')
const profileEditBtn = document.querySelector('.profile__edit-button')
const profileAddBtn = document.querySelector('.profile__add-button')
// const popupList = document.querySelectorAll('.popup')





function openPopup(popup) {
  popup.classList.add('popup_is-opened')

  popup.querySelector('.popup__close').addEventListener('click', (evt) => {
    evt.target.closest('.popup').classList.remove('popup_is-opened')
    // closePopup(popup)
  })

  // popup.addEventListener('click', (evt) => {
  //   if (evt.target.classList.contains('popup__close')) {
  //     closePopup(popup)
  //   }
  // })
}

// function closePopup(popup) {
//   popup.classList.remove('popup_is-opened')
// }

profileEditBtn.addEventListener('click', () => {
  openPopup(popupEditProfile)
})

profileAddBtn.addEventListener('click', () => {
  openPopup(popupNewCard)
})



// popupCloseBtn.addEventListener('click', (evt) => {
//   closePopup(evt.target.closest('.popup'))
//   console.log(evt.target.closest('.popup'))
// })

// popupCloseBtn.addEventListener('click', () => {
//   closePopup(popupEditProfile)
// })

// popupCloseBtn.addEventListener('click', () => {
//   closePopup(popupCloseBtn.closest('.popup'));
// })

// popupCloseBtn.addEventListener('click', () => {
//   console.log('click!!')
// })