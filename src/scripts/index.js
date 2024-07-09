import {initialCards} from './cards.js'
import '../pages/index.css'


// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content


// @todo: DOM узлы
const content = document.querySelector('.content')
const cardContainer = content.querySelector('.places__list')


// @todo: Функция создания карточки
function createCard(name, link, deleteCard, getLikeCard, openPopupCardImg) {

  const card = cardTemplate.querySelector('.places__item').cloneNode(true)
  const deleteButton = card.querySelector('.card__delete-button')
  const likeButton = card.querySelector('.card__like-button')

  const cardImg = card.querySelector('.card__image')

  cardImg.addEventListener('click', openPopupCardImg)

  // const cardImg = card.querySelector('.card__image')
  // cardImg.addEventListener('click', () => {
  //   const popupImg = popupTypeImg.querySelector('.popup__image')
  //   const popupCaption = popupTypeImg.querySelector('.popup__caption') 
  //   popupImg.setAttribute('src', link)
  //   popupCaption.textContent = name
  //   openPopup(popupTypeImg)
  // })

  card.querySelector('.card__title').textContent = name
  card.querySelector('.card__image').src = link
  
  deleteButton.addEventListener('click', deleteCard)
  likeButton.addEventListener('click', getLikeCard)

  return card
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  evt.target.closest('.places__item').remove()
}

const popupTypeImg = document.querySelector('.popup_type_image')
const popupImg = popupTypeImg.querySelector('.popup__image')
const popupCaption = popupTypeImg.querySelector('.popup__caption')

function openPopupCardImg(evt) {
  const link = evt.target.src
  popupImg.src = link

  const name = evt.target.closest('.card').querySelector('.card__title').textContent
  popupCaption.textContent = name

  openPopup(popupTypeImg)
}

function getLikeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active')
}

// @todo: Вывести карточки на страницу
initialCards.forEach( (cardElement) => {
  cardContainer.append(createCard(cardElement.name, cardElement.link, deleteCard, getLikeCard, openPopupCardImg))
})

const popupEditProfile = document.querySelector('.popup_type_edit')
const popupNewCard = document.querySelector('.popup_type_new-card')
const profileEditBtn = document.querySelector('.profile__edit-button')
const profileAddBtn = document.querySelector('.profile__add-button')



function openPopup(popup) {
  popup.classList.add('popup_is-opened', 'popup_is-animated')

  const popupCloseBtn = popup.querySelector('.popup__close')

  popupCloseBtn.addEventListener('click', (evt) => {
    closePopup(popup)
    evt.stopPropagation()
  },true)

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closePopup(popup)
    }
  })

  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      closePopup(popup)
    }
  })
  
}


function closePopup(popup) {
  popup.classList.remove('popup_is-opened')  
}

profileEditBtn.addEventListener('click', () => {
  openPopup(popupEditProfile)
  editProfileFormName.value = profileTitle.textContent
  editProfileFormDescription.value = profileDescription.textContent
})

profileAddBtn.addEventListener('click', () => {
  openPopup(popupNewCard)
})

//форма профиля
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')

const editProfileForm = document.forms['edit-profile']
const editProfileFormName = editProfileForm['name']
const editProfileFormDescription = editProfileForm.description


function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                              // Так мы можем определить свою логику отправки.
                                              // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value

  // Выберите элементы, куда должны быть вставлены значения полей
  profileTitle.textContent = editProfileFormName.value
  profileDescription.textContent = editProfileFormDescription.value

  // Вставьте новые значения с помощью textContent

  // evt.target.closest('.popup').classList.remove('popup_is-opened')
  closePopup(evt.target.closest('.popup'))
}

editProfileForm.addEventListener('submit', handleFormSubmit)


//форма карточки
const newPlaceForm = document.forms['new-place']
const newPlaceFormName = newPlaceForm['place-name']
const newPlaceFormLink = newPlaceForm.link

newPlaceForm.addEventListener('submit', (evt) => {
  evt.preventDefault()

  cardContainer.prepend(createCard(newPlaceFormName.value, newPlaceFormLink.value, deleteCard))
  closePopup(evt.target.closest('.popup'))

  newPlaceForm.reset()
})