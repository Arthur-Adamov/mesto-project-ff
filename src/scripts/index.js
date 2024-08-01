// import {initialCards} from '../components/initialCards.js'
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


//Обноляет информацию профиля с сервера
import {getProfileInfo} from '../components/api.js'


const renderProfile = (profileInfo) => {
  profileTitle.textContent = profileInfo.name
  profileDescription.textContent = profileInfo.about
}

const renderProfileAvatar = (profileInfo) => {
  profileAvatar.style.backgroundImage = `url(${profileInfo.avatar})`
}

//открытие попапа смены аватара
profileAvatar.addEventListener('click', () => {
  openPopup(popupEditAvatar)
})

import {editAvatar} from '../components/api.js'
//отправка формы с ссылкой на новый аватар
editAvatarProfileForm.addEventListener('submit', (evt) => {
  evt.preventDefault()

  editAvatar(editAvatarProfileLink.value)

  closePopup(popupEditAvatar)
  editAvatarProfileForm.reset()
})

//открытие попапа профиля
profileEditBtn.addEventListener('click', () => {
  openPopup(popupEditProfile)
  editProfileFormName.value = profileTitle.textContent
  editProfileFormDescription.value = profileDescription.textContent
})

import {editProfileFormInfo} from '../components/api.js'

//заполняет и отправяет на сервер форму профиля
function handleFormEditProfileSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = editProfileFormName.value
  profileDescription.textContent = editProfileFormDescription.value

  editProfileFormInfo(editProfileFormName, editProfileFormDescription)

  closePopup(popupEditProfile)
}

editProfileForm.addEventListener('submit', handleFormEditProfileSubmit)


import {addNewCard} from '../components/api.js'

newPlaceForm.addEventListener('submit', (evt) => {
  evt.preventDefault()

  addNewCard(newPlaceFormName.value, newPlaceFormLink.value)

  closePopup(popupNewCard)

  newPlaceForm.reset()
})


import {getInitialCards} from '../components/api.js'

//создаем карточки из массива
const renderCards = (cards) => {
  cards.forEach((cardElement) => {
    // deleteCardOnServer(cardElement)
    // console.log(cardElement._id)
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
  });


//открытие попапа карточки
profileAddBtn.addEventListener('click', () => {
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

//Валидация формы
enableValidation()
