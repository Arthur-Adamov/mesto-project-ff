import '../pages/index.css'
import {createCard} from './card.js'
import {deleteCard} from './card.js'
import {getLikeCard} from './card.js'

import {openPopup} from '../components/modal.js'
import {closePopup} from '../components/modal.js'

import {enableValidation, clearValidation} from './validation.js'

import {getProfileInfo} from '../components/api.js'
import {editAvatar} from '../components/api.js'
import {editProfileFormInfo} from '../components/api.js'
import {addNewCard} from '../components/api.js'
import {getInitialCards} from '../components/api.js'


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// @todo: DOM узлы
const content = document.querySelector('.content')
const cardContainer = content.querySelector('.places__list')

const popupSaveButton = document.querySelector('.popup__button')

const popupTypeImg = document.querySelector('.popup_type_image')
const popupImg = popupTypeImg.querySelector('.popup__image')
const popupCaption = popupTypeImg.querySelector('.popup__caption')

const popupEditAvatar = document.querySelector('.popup_type_avatar')
const popupEditProfile = document.querySelector('.popup_type_edit')
const popupNewCard = document.querySelector('.popup_type_new-card')
const profileEditBtn = document.querySelector('.profile__edit-button')
const profileAddBtn = document.querySelector('.profile__add-button')

//форма профиля
const profileAvatar = document.querySelector('.profile__image')
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')

const editAvatarProfileForm = document.forms['edit-avatar']
const editAvatarProfileLink = editAvatarProfileForm.link

const editProfileForm = document.forms['edit-profile']
const editProfileFormName = editProfileForm['name']
const editProfileFormDescription = editProfileForm.description

//форма карточки
const newPlaceForm = document.forms['new-place']
const newPlaceFormName = newPlaceForm['place-name']
const newPlaceFormLink = newPlaceForm.link

//кнопки закрытия всех попапов
const popupEditAvatarCloseButton = popupEditAvatar.querySelector('.popup__close')
const popupEditProfileCloseButton = popupEditProfile.querySelector('.popup__close')
const popupNewCardCloseButton = popupNewCard.querySelector('.popup__close')
const popupTypeImgCloseButton = popupTypeImg.querySelector('.popup__close')


const renderLoading = (isLoading, popup) => {
  const popupSaveButton = popup.querySelector('.popup__button')
  if(isLoading) {
    popupSaveButton.textContent = 'Сохранение...'
  } else {
    popupSaveButton.textContent = 'Сохранить'
  }
}

//рендерим профиль
const renderProfile = (profileInfo) => {
  profileTitle.textContent = profileInfo.name
  profileDescription.textContent = profileInfo.about
}

//рендерим аватар
const renderProfileAvatar = (profileInfo) => {
  profileAvatar.style.backgroundImage = `url(${profileInfo.avatar})`
}

//открытие попапа смены аватара
profileAvatar.addEventListener('click', () => {
  clearValidation(editAvatarProfileForm, validationConfig)
  openPopup(popupEditAvatar)
})

//отправка формы с ссылкой на новый аватар
editAvatarProfileForm.addEventListener('submit', (evt) => {
  evt.preventDefault()
  renderLoading(true, popupEditAvatar)

  const avatarLink = editAvatarProfileLink.value

  editAvatar(avatarLink)
  .then((avatarLink) => {
    renderProfileAvatar(avatarLink)
  })
  .catch((err) => {
    console.log('Ошибка, запрос не выполнен', err)
  })
  .finally(() => {
    renderLoading(false, popupEditAvatar)
  })

  closePopup(popupEditAvatar)
  editAvatarProfileForm.reset()
})

//открытие попапа профиля
profileEditBtn.addEventListener('click', () => {
  clearValidation(editProfileForm, validationConfig)
  openPopup(popupEditProfile)
  editProfileFormName.value = profileTitle.textContent
  editProfileFormDescription.value = profileDescription.textContent
})

//заполняет и отправяет на сервер форму профиля
function handleFormEditProfileSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupEditProfile)

  const profileInfo = {
    name: editProfileFormName.value,
    about: editProfileFormDescription.value
  }

  editProfileFormInfo(profileInfo)
  .then((profileInfo) => {
    renderProfile(profileInfo)
  })
  .catch((err) => {
    console.log('Ошибка, запрос не выполнен', err)
  })
  .finally(() => {
    renderLoading(false, popupEditProfile)
  })

  closePopup(popupEditProfile)
}

editProfileForm.addEventListener('submit', handleFormEditProfileSubmit)

newPlaceForm.addEventListener('submit', (evt) => {
  evt.preventDefault()
  renderLoading(true, popupNewCard)

  const cardInfo = {
    name: newPlaceFormName.value,
    link: newPlaceFormLink.value
  }

  addNewCard(cardInfo)
  .then((cardElement) => {
    cardContainer.prepend(
      createCard(
        myId,
        cardElement.name,
        cardElement.link,
        cardElement.likes,
        deleteCard,
        getLikeCard,
        openPopupCardImg,
        cardElement
      )
    )
  })
  .catch((err) => {
    console.log('Ошибка, запрос не выполнен', err)
  })
  .finally(() => {
    renderLoading(false, popupNewCard)
  })

  closePopup(popupNewCard)

  newPlaceForm.reset()
})

//создаем карточки из массива
const renderCards = (cards) => {
  cards.forEach((cardElement) => {
    cardContainer.append(
      createCard(
        myId,
        cardElement.name,
        cardElement.link,
        cardElement.likes,
        deleteCard,
        getLikeCard,
        openPopupCardImg,
        cardElement
      )
    )
  })
}


let myId
//выводим карточки на страницу
Promise.all([getProfileInfo(), getInitialCards()])
  .then(([profileInfo, card]) => {
    myId = profileInfo._id
    renderProfile(profileInfo)
    renderCards(card)
    renderProfileAvatar(profileInfo)
  })
  .catch((err) => {
    console.log('Ошибка, запрос не выполнен', err)
  })


//открытие попапа карточки
profileAddBtn.addEventListener('click', () => {
  clearValidation(newPlaceForm, validationConfig)
  openPopup(popupNewCard)
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
popupEditAvatarCloseButton.addEventListener('click', () => {
  closePopup(popupEditAvatar)
})

popupEditProfileCloseButton.addEventListener('click', () => {
  closePopup(popupEditProfile)
})

popupNewCardCloseButton.addEventListener('click', () => {
  closePopup(popupNewCard)
})

popupTypeImgCloseButton.addEventListener('click', () => {
  closePopup(popupTypeImg)
})

//Валидация форм
enableValidation(validationConfig)
