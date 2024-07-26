import {initialCards} from '../components/initialCards.js'
import '../pages/index.css'
import {createCard} from './cards.js'
import {deleteCard} from './cards.js'
import {getLikeCard} from './cards.js'

import {openPopup} from '../components/modal.js'
import {closePopup} from '../components/modal.js'

import {enableValidation} from './validation.js'


// @todo: DOM узлы
const content = document.querySelector('.content')
const cardContainer = content.querySelector('.places__list')

const popupTypeImg = document.querySelector('.popup_type_image')
const popupImg = popupTypeImg.querySelector('.popup__image')
const popupCaption = popupTypeImg.querySelector('.popup__caption')

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

//кнопки закрытия всех попапов
const popupEditProfileCloseButton = popupEditProfile.querySelector('.popup__close')
const popupNewCardCloseButton = popupNewCard.querySelector('.popup__close')
const popupTypeImgCloseButton = popupTypeImg.querySelector('.popup__close')


// @todo: Вывести карточки на страницу
// initialCards.forEach( (cardElement) => {
//   cardContainer.append(createCard(cardElement.name, cardElement.link, deleteCard, getLikeCard, openPopupCardImg))
// })


//Обноляет информацию профиля с сервера
import {updateProfileInfo} from '../components/api.js'
updateProfileInfo(profileTitle, profileDescription)


import {addNewCard} from '../components/api.js'
//помещаем карточу в начало списка
newPlaceForm.addEventListener('submit', (evt) => {
  evt.preventDefault()

  addNewCard(newPlaceFormName.value, newPlaceFormLink.value)

  // cardContainer.prepend(createCard(newPlaceFormName.value, newPlaceFormLink.value, deleteCard, getLikeCard, openPopupCardImg))

  closePopup(popupNewCard)

  newPlaceForm.reset()
})


import {getInitialCards} from '../components/api.js'

//создаем карточки из массива
const renderCards = (cards) => {
  cards.forEach((cardElement) => {
    cardContainer.prepend(createCard(cardElement.name, cardElement.link, deleteCard, getLikeCard, openPopupCardImg))
  })
}

//выводим карточки на страницу
Promise.all([getInitialCards()])
  .then(([card]) => {
    renderCards(card)
  });


//открытие попапов
profileEditBtn.addEventListener('click', () => {
  openPopup(popupEditProfile)
  editProfileFormName.value = profileTitle.textContent
  editProfileFormDescription.value = profileDescription.textContent
})

profileAddBtn.addEventListener('click', () => {
  openPopup(popupNewCard)
})

import {editProfileFormInfo} from '../components/api.js'

//отправка заполненой формы
function handleFormEditProfileSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = editProfileFormName.value
  profileDescription.textContent = editProfileFormDescription.value

  editProfileFormInfo(editProfileFormName, editProfileFormDescription)

  closePopup(popupEditProfile)
}

editProfileForm.addEventListener('submit', handleFormEditProfileSubmit)

//Валидация формы
enableValidation()




//функция открытия попапа с картинкой
function openPopupCardImg(evt) {
  const link = evt.target.src
  popupImg.src = link

  const name = evt.target.closest('.card').querySelector('.card__title').textContent
  popupCaption.textContent = name
  popupImg.alt = name

  openPopup(popupTypeImg)
}

//слушатели закрытия попапов
popupEditProfileCloseButton.addEventListener('click', () => {
  closePopup(popupEditProfile)
})

popupNewCardCloseButton.addEventListener('click', () => {
  closePopup(popupNewCard)
})

popupTypeImgCloseButton.addEventListener('click', () => {
  closePopup(popupTypeImg)
})
