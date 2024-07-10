import {initialCards} from './cards.js'
import '../pages/index.css'
import {createCard} from './cards.js'
import {deleteCard} from './cards.js'
import {getLikeCard} from './cards.js'

import {openPopupCardImg} from '../components/modal.js'
import {openPopup} from '../components/modal.js'
import {closePopup} from '../components/modal.js'


// @todo: Темплейт карточки
export const cardTemplate = document.querySelector('#card-template').content


// @todo: DOM узлы
const content = document.querySelector('.content')
const cardContainer = content.querySelector('.places__list')

export const popupTypeImg = document.querySelector('.popup_type_image')
export const popupImg = popupTypeImg.querySelector('.popup__image')
export const popupCaption = popupTypeImg.querySelector('.popup__caption')

const popupEditProfile = document.querySelector('.popup_type_edit')
const popupNewCard = document.querySelector('.popup_type_new-card')
const profileEditBtn = document.querySelector('.profile__edit-button')
const profileAddBtn = document.querySelector('.profile__add-button')

//форма профиля
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')

const editProfileForm = document.forms['edit-profile']
const editProfileFormName = editProfileForm['name']
const editProfileFormDescription = editProfileForm.description

//форма карточки
const newPlaceForm = document.forms['new-place']
const newPlaceFormName = newPlaceForm['place-name']
const newPlaceFormLink = newPlaceForm.link


// @todo: Вывести карточки на страницу
initialCards.forEach( (cardElement) => {
  cardContainer.append(createCard(cardElement.name, cardElement.link, deleteCard, getLikeCard, openPopupCardImg))
})

profileEditBtn.addEventListener('click', () => {
  openPopup(popupEditProfile)
  editProfileFormName.value = profileTitle.textContent
  editProfileFormDescription.value = profileDescription.textContent
})

profileAddBtn.addEventListener('click', () => {
  openPopup(popupNewCard)
})

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = editProfileFormName.value
  profileDescription.textContent = editProfileFormDescription.value

  closePopup(evt.target.closest('.popup'))
}

editProfileForm.addEventListener('submit', handleFormSubmit)

newPlaceForm.addEventListener('submit', (evt) => {
  evt.preventDefault()

  cardContainer.prepend(createCard(newPlaceFormName.value, newPlaceFormLink.value, deleteCard))
  closePopup(evt.target.closest('.popup'))

  newPlaceForm.reset()
})
