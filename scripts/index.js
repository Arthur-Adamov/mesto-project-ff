const cardTemplate = document.querySelector('#card-template').content

const content = document.querySelector('.content')
const cardContainer = content.querySelector('.places__list')





const cardElements = initialCards.map(function (item) {
        return {
                name: item.name,
                link: item.link
        };
});

function render() {
        cardElements.map(createCard);
}      

function createCard({name, link}) {

        const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true)        

        cardElement.querySelector('.card__title').textContent = name
        cardElement.querySelector('.card__image').src = link

        return cardContainer.append(cardElement)
}

render()




//третий способ
// function createCard(name, link) {
//         const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true)

//         cardContainer.append(cardElement)

//         document.querySelectorAll('.card__title').forEach((name, i) => name.textContent = initialCards[i].name)
//         document.querySelectorAll('.card__image').forEach((link, i) => link.src = initialCards[i].link)
// }
// initialCards.forEach(createCard)




// четвертый способ


// function createCard(name, link) {
//         const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true)
//         cardContainer.append(cardElement)
        


// }
// initialCards.forEach(createCard)







// @todo: Темплейт карточки


// @todo: DOM узлы

// @todo: Функция создания карточки




// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
