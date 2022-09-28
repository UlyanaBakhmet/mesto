const initialCards = [
    {
        'name': 'Карелия',
        'link': './images/gridPhoto1.jpg'
    },
    {
        'name': 'Астраханская область',
        'link': './images/gridPhoto2.jpg'
    },
    {
        'name': 'Камчатка',
        'link': './images/gridPhoto3.jpg'
    },
    {
        'name': 'Дагестан',
        'link': './images/gridPhoto4.jpeg'
    },
    {
        'name': 'Мурманск',
        'link': './images/gridPhoto5.jpg'
    },
    {
        'name': 'Якутия',
        'link': './images/gridPhoto6.jpg'
    }
];

const userPopup = document.querySelector('.popup_type_user');
const popupUserForm = userPopup.querySelector('.popup__form_type_user');
const inputUserName = userPopup.querySelector('.popup__input_type_name');
const inputUserProfession = userPopup.querySelector('.popup__input_type_profession');

const addButton = document.querySelector('.profile__add-button');
const closeUserPopup = document.querySelector('.close-user-popup');
const closeCardPopup = document.querySelector('.close-card-popup');
const closeImgPopup = document.querySelector('.close-img-popup');

const cardPopup = document.querySelector('.popup_type_card');
const popupCardForm = cardPopup.querySelector('.popup__form_type_card');
const cardsContainer = document.querySelector('.elements__container');
const cardTemplate = document.querySelector('.card-template').content;

const popupTypeImg = document.querySelector('.popup_type_img');
const imgZoom = document.querySelector('.popup__img');
const imgFigcaption = document.querySelector('.popup__figcaption');

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileProfession = profile.querySelector('.profile__profession');
const editButton = profile.querySelector('.profile__edit-button');

const inputCardName = document.querySelector('.popup__input_type_card-name');
const inputCardLink = document.querySelector('.popup__input_type_card-link');


//добавление карточки
function createCard(name, link) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__name');
    const cardImage = cardElement.querySelector('.card__image');
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__button-delete');
    cardImage.src = link;
    cardTitle.alt = name;
    cardTitle.textContent = name;
    likeButton.addEventListener('click', () => toggleLike(likeButton));
    deleteButton.addEventListener('click', () => deleteCard(deleteButton));
    cardImage.addEventListener('click', () => openPhotoPopup(link, name));
    return cardElement;
}


function renderCards(array) {
    array.forEach((el) => {
    cardsContainer.append(createCard(el.name, el.link));
});
}

renderCards(initialCards);

//передача данных с формы в профиль
function handleEditFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = inputUserName.value;
    profileProfession.textContent = inputUserProfession.value;
    closePopup(userPopup);
}

//форма добавления фото
function handleAddPhotoFormSubmit(evt) {
    evt.preventDefault();
    cardsContainer.prepend(createCard(inputCardName.value, inputCardLink.value));
    evt.target.reset();
    closePopup(cardPopup);
}

//удаление карточки
function deleteCard(button) {
    const cardItem = button.closest('.card');
    cardItem.remove();
}


function takeInfo () {
    inputUserName.value = profileName.textContent;
    inputUserProfession.value = profileProfession.textContent;
}

//открыть фото
function openPhotoPopup(link, name) {
    openPopup(popupTypeImg);
    imgZoom.src = link;
    imgZoom.alt = name;
    imgFigcaption.textContent = name;
}


function openPopup(popup) {
    popup.classList.add('popup_opened');
}


function closePopup(popup) {
    popup.classList.remove('popup_opened');
}


function toggleLike(button) {
    button.classList.toggle('card__like-button_active');
}


editButton.addEventListener('click', () => {
    openPopup(userPopup);
    takeInfo();
});


addButton.addEventListener('click', () => {
    openPopup(cardPopup);
});


//закрытие попапа редактирования
closeUserPopup.addEventListener('click', () => {
    closePopup(userPopup);
});

//закрытие попапа добавления фото
closeCardPopup.addEventListener('click', () => {
    closePopup(cardPopup);
});

//закрытие увеличенного фото
closeImgPopup.addEventListener('click', () => {
    closePopup(popupTypeImg);
});


//слушатели
popupUserForm.addEventListener('submit', handleEditFormSubmit);
popupCardForm.addEventListener('submit', handleAddPhotoFormSubmit);
