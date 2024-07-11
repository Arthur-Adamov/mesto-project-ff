export function openPopup(popup) {
  popup.classList.add('popup_is-animated')

  setTimeout(() => {
    popup.classList.add('popup_is-opened')
  }, 1)

  document.addEventListener('keydown', handleEscape)
  document.addEventListener('click', handleClickOverlaly)
}

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened')
  document.removeEventListener('keydown', handleEscape)
  document.removeEventListener('click', handleClickOverlaly)
}

function handleEscape(evt) {
  const popupIsOpen = document.querySelector('.popup_is-opened')
  if (evt.key === 'Escape') {
    closePopup(popupIsOpen)
  }
}

function handleClickOverlaly(evt) {
  const popupIsOpen = document.querySelector('.popup_is-opened')
  if (evt.target.classList.contains('popup_is-opened')) {
    closePopup(popupIsOpen)
  }
}
