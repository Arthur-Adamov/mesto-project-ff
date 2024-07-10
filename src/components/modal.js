// import {popupImg} from '../scripts/index.js'
// import {popupCaption} from '../scripts/index.js'
// import {popupTypeImg} from '../scripts/index.js'


// export function openPopupCardImg(evt) {
//   const link = evt.target.src
//   popupImg.src = link

//   const name = evt.target.closest('.card').querySelector('.card__title').textContent
//   popupCaption.textContent = name

//   openPopup(popupTypeImg)
// }

export function openPopup(popup) {
  popup.classList.add('popup_is-animated')

  setTimeout(() => {
    popup.classList.add('popup_is-opened')
  }, 1)

  // const popupCloseBtn = popup.querySelector('.popup__close')

  // popupCloseBtn.addEventListener('click', () => {
  //   closePopup(popup)
  // })

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

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened')
}
