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
    // evt.target.closest('.popup').classList.remove('popup_is-opened')
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

  // popup.addEventListener('click', (evt) => {
  //   if (evt.target.classList.contains('popup__close')) {
  //     closePopup(popup)
  //   }
  // })
  
}

// function closePopup(evt) {
//   evt.target.closest('.popup').classList.remove('popup_is-opened')
// }

function closePopup(popup) {
  popup.classList.remove('popup_is-opened')
  // editProfileForm.reset()
}

profileEditBtn.addEventListener('click', () => {
  openPopup(popupEditProfile)
  editProfileFormName.value = profileTitle.textContent
  editProfileFormDescription.value = profileDescription.textContent
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


//форма профиля
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')

const editProfileForm = document.forms['edit-profile']
const editProfileFormName = editProfileForm['name']
const editProfileFormDescription = editProfileForm.description

// console.log(editProfileForm)

function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                              // Так мы можем определить свою логику отправки.
                                              // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value

  // Выберите элементы, куда должны быть вставлены значения полей
  profileTitle.textContent = editProfileFormName.value
  profileDescription.textContent = editProfileFormDescription.value

  // Вставьте новые значения с помощью textContent

  evt.target.closest('.popup').classList.remove('popup_is-opened')
  // closePopup(popup)

}

editProfileForm.addEventListener('submit', handleFormSubmit)

// const newPlaceForm = document.forms['new-place']

// console.log(editProfileForm.elements)
// console.log(editProfileFormName)
// console.log(editProfileFormDescription)

// console.log(newPlaceForm)


//форма карточки
const newPlaceForm = document.forms['new-place']
const newPlaceFormName = newPlaceForm['place-name']
const newPlaceFormLink = newPlaceForm.link

newPlaceForm.addEventListener('submit', (evt) => {
  evt.preventDefault()

  cardContainer.prepend(createCard(newPlaceFormName.value, newPlaceFormLink.value, deleteCard))
  evt.target.closest('.popup').classList.remove('popup_is-opened')
  newPlaceForm.reset()
})