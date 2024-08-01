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
}

//Обновляет информацию о профиле на сервере с заполненной формы
export const editProfileFormInfo = (
  editProfileFormName,
  editProfileFormDescription
) => {
  fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify({
      name: editProfileFormName.value,
      about: editProfileFormDescription.value
    })
  })
}


//Обноляет информацию профиля с сервера
export const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(handleResponse)
  .catch((err) => {
    console.log('Ошибка, запрос не выполнен', err)
  })
}


//обновляем аватар
export const editAvatar = (link) => {
  fetch(`${config.baseUrl}/users/me/avatar`, {
    headers: config.headers,
    method: 'PATCH',
      body: JSON.stringify({
        avatar: link
      })
  })
  .then(handleResponse)
  .then((data) => {
    console.log(data)
  })
}


//Добавляем карточку на сервер
export const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(handleResponse)
  .then((data) => {
    console.log(data)
  })
}

//Получаем массив каточек с сервера
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then((res) => res.json())
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен', err);
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
