const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-19',
  headers: {
    authorization: '10a67bb0-bc78-4f2e-ab49-c307af5093b0',
    'Content-Type': 'application/json'
  }
}

const handleResponse = (response) => {
  if(response.ok) {
    return response.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}

//Обновляет информацию о профиле на сервере с заполненной формы
export const editProfileFormInfo = (profileInfo) => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify({
      name: profileInfo.name,
      about: profileInfo.about
    })
  })
  .then(handleResponse)
}

//Обноляет информацию профиля с сервера
export const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(handleResponse)
}

//обновляем аватар
export const editAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    headers: config.headers,
    method: 'PATCH',
      body: JSON.stringify({
        avatar: link
      })
  })
  .then(handleResponse)
}

//Добавляем карточку на сервер
export const addNewCard = (cardInfo) => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify({
      name: cardInfo.name,
      link: cardInfo.link
    })
  })
  .then(handleResponse)
}

//Получаем массив каточек с сервера
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(handleResponse)
  .then((res) => {
    return res
  })
}

//запрос на удаление карточки
export const deleteCardOnServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    headers: config.headers,
    method: 'DELETE'
  })
  .then(handleResponse)
}

//постановка лайка
export const setLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: 'PUT'
  })
  .then(handleResponse)
}

//снятие лайка
export const removeLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: 'DELETE'
  })
  .then(handleResponse)
}
