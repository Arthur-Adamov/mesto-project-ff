const arhiz = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg', import.meta.url);
const chelyabinskayzObl = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg', import.meta.url)
const ivanovo = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg', import.meta.url);
const kamchatka = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg', import.meta.url);
const holmogorskiyRayon = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg', import.meta.url);
const baykal = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg', import.meta.url);

export const initialCards = [
    {
      name: "Архыз",
      link: arhiz,
    },
    {
      name: "Челябинская область",
      link: chelyabinskayzObl,
    },
    {
      name: "Иваново",
      link: ivanovo,
    },
    {
      name: "Камчатка",
      link: kamchatka,
    },
    {
      name: "Холмогорский район",
      link: holmogorskiyRayon,
    },
    {
      name: "Байкал",
      link: baykal,
    }
];


// const initialCards = [
//     {
//       name: "Архыз",
//       link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
//     },
//     {
//       name: "Челябинская область",
//       link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
//     },
//     {
//       name: "Иваново",
//       link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
//     },
//     {
//       name: "Камчатка",
//       link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
//     },
//     {
//       name: "Холмогорский район",
//       link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
//     },
//     {
//       name: "Байкал",
//       link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
//     }
// ];