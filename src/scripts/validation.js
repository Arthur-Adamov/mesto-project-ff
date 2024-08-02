//Валидация формы

// const validationConfig = {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// }


const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add('popup__input_type_error')

  if(!inputElement.value) {
    errorElement.textContent = 'Вы пропустили это поле.'
  } else {
    errorElement.textContent = errorMessage
  }

  errorElement.classList.add('popup__error_visible')
}



const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)

  inputElement.classList.remove('popup__input_type_error')
  errorElement.classList.remove('popup__error_visible')
  errorElement.textContent = ''
}

const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage)
  } else {
    inputElement.setCustomValidity("")
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage)
  } else {
    hideInputError(
      formElement,
      inputElement)
  }
}

const toggleButtonState = (inputList, buttonElement) => {
  if(hasInvalidInput(inputList) ) {
    buttonElement.disabled = true
    buttonElement.classList.add('popup__button_disabled')
  } else {
    buttonElement.disabled = false
    buttonElement.classList.remove('popup__button_disabled')
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

  toggleButtonState(inputList, buttonElement)

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement)

      toggleButtonState(inputList, buttonElement)
    })
  })
}

export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'))

  formList.forEach((formElement) => {
    setEventListeners(formElement)
  })

}

export const clearValidation = (formElement) => {
  const buttonElement = formElement.querySelector('.popup__button')

  const inputList = Array.from(formElement.querySelectorAll('.popup__input'))

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement)
  })
  toggleButtonState(inputList, buttonElement)
}

