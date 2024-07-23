import {initialCards} from '../components/initialCards.js'
import '../pages/index.css'
import {createCard} from './cards.js'
import {deleteCard} from './cards.js'
import {getLikeCard} from './cards.js'

import {openPopup} from '../components/modal.js'
import {closePopup} from '../components/modal.js'


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
initialCards.forEach( (cardElement) => {
  cardContainer.append(createCard(cardElement.name, cardElement.link, deleteCard, getLikeCard, openPopupCardImg))
})

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

  closePopup(popupEditProfile)
}

editProfileForm.addEventListener('submit', handleFormEditProfileSubmit)

//Валидация формы
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)

  inputElement.classList.add('popup__input_type_error')

  if(!inputElement.value) {
    errorElement.textContent = 'Вы пропустили это поле.'
  } else {
    errorElement.textContent = errorMessage
  }

  errorElement.classList.add('form__input-error_active')
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)

  inputElement.classList.remove('popup__input_type_error')
  errorElement.classList.remove('form__input-error_active')
  errorElement.textContent = ''
}

const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage)
  } else {
    inputElement.setCustomValidity("")
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage)
  } else {
    hideInputError(formElement, inputElement)
  }
}

const toggleButtonState = (inputList, buttonElement) => {
  if(hasInvalidInput(inputList) ) {
    buttonElement.disabled = true
    buttonElement.classList.add('form__submit_inactive')
  } else {
    buttonElement.disabled = false
    buttonElement.classList.remove('form__submit_inactive')
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'))
  const buttonElement = formElement.querySelector('.popup__button')



  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement)

      toggleButtonState(inputList, buttonElement)
    })
  })
}


const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'))

  formList.forEach((formElement) => {
    setEventListeners(formElement)
  })

}

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
