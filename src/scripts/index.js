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

//открытие попапов
profileEditBtn.addEventListener('click', () => {
  openPopup(popupEditProfile)
  editProfileFormName.value = profileTitle.textContent
  editProfileFormDescription.value = profileDescription.textContent
})

profileAddBtn.addEventListener('click', () => {
  openPopup(popupNewCard)
})

//отправка заполненой формы
function handleFormEditProfileSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = editProfileFormName.value
  profileDescription.textContent = editProfileFormDescription.value

  fetch('https://nomoreparties.co/v1/wff-cohort-19/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '10a67bb0-bc78-4f2e-ab49-c307af5093b0',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      // name: 'Marie Skłodowska Curie',
      // about: 'Physicist and Chemist'

      name: editProfileFormName.value,
      about: editProfileFormDescription.value
    })
  })

  closePopup(popupEditProfile)
}

editProfileForm.addEventListener('submit', handleFormEditProfileSubmit)

//Валидация формы
enableValidation()


newPlaceForm.addEventListener('submit', (evt) => {
  evt.preventDefault()

  cardContainer.prepend(createCard(newPlaceFormName.value, newPlaceFormLink.value, deleteCard, getLikeCard, openPopupCardImg))
  closePopup(popupNewCard)

  newPlaceForm.reset()
})

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

function updateCards () {
  fetch('https://mesto.nomoreparties.co/v1/wff-cohort-19/cards', {
    headers: {
      authorization: '10a67bb0-bc78-4f2e-ab49-c307af5093b0'
    }
  })
    .then(res => res.json())
    .then((result) => {

      // const newArr = initialCards.concat(result)

      result.forEach( (cardElement) => {
        cardContainer.prepend(createCard(cardElement.name, cardElement.link, deleteCard, getLikeCard, openPopupCardImg))
      })

    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен', err);
    })

}

updateCards()


function updateProfileInfo () {
  fetch('https://nomoreparties.co/v1/wff-cohort-19/users/me', {
    headers: {
      authorization: '10a67bb0-bc78-4f2e-ab49-c307af5093b0'
    }
  })
  .then(res => res.json())
  .then((res) => {
    console.log(res)
    profileTitle.textContent = res.name
    profileDescription.textContent = res.about
  })
  .catch((err) => {
    console.log('Ошибка, запрос не выполнен', err)
  })
}

updateProfileInfo()
