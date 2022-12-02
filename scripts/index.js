//импортируем:

import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards} from './cards.js';
import Section from './Section.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';

const userPopup = document.querySelector(".popup_type_user");
const popupUserForm = userPopup.querySelector(".popup__form_type_user");
const userNameInput = userPopup.querySelector(".popup__input_type_name");
const userProfessionInput = userPopup.querySelector(".popup__input_type_profession");

const buttonAdd = document.querySelector(".profile__add-button");
const userPopupClose = document.querySelector(".close-user-popup");
const cardPopupClose = document.querySelector(".close-card-popup");
const imgPopupClose = document.querySelector(".close-img-popup");

const cardPopup = document.querySelector(".popup_type_card");
const popupCardForm = cardPopup.querySelector(".popup__form_type_card");
const cardsContainer = document.querySelector(".elements__container");
const cardTemplate = document.querySelector(".card-template").content;

const popupTypeImg = document.querySelector(".popup_type_img");
const imgZoom = document.querySelector(".popup__img");
const imgFigcaption = document.querySelector(".popup__figcaption");

const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileProfession = profile.querySelector(".profile__profession");
const buttonEdit = profile.querySelector(".profile__edit-button");

const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_card-link");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_notactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_active",
};

//валидация форм
//const profileValidator = new FormValidator(validationConfig, popupUserForm);
const profileValidator = new FormValidator(validationConfig, userPopup);
profileValidator.enableValidation();

//const cardValidator = new FormValidator(validationConfig, popupCardForm);
const cardValidator = new FormValidator(validationConfig, cardPopup);
cardValidator.enableValidation();

//метод отрисовки изначальных карточек
const section = new Section ({
  items: initialCards,
  renderer: (item) => {
    const card = newCard(item);
    section.addItem(card);
  }
}, '.elements__container'
);

//добавление карточки новой
const newCard = (item) => {
  const card = new Card(item, '.card-template', (name, link) => { openPhotoPopup.open(name, link) });
  return card.createCard();
}

//вызов метода класса Section
section.renderItems();

const userInfo = new UserInfo ({
  userName: '.profile__name',
  userProfession: '.profile__profession',
});

const popupUserEdit = new PopupWithForm('.popup_type_user', (inputsValues) => {  
  popupUserEdit.close();
  userInfo.setUserInfo(inputsValues);
});
popupUserEdit.setEventListeners();

const popupAddCard = new PopupWithForm('.popup_type_card', (dataCard) => {
  const card = newCard(dataCard);
  section.addItem(card);
  popupAddCard.close();
  cardValidator._buttonNotActive();
});
popupAddCard.setEventListeners();

const openPhotoPopup = new PopupWithImage('.popup_type_img');
openPhotoPopup.setEventListeners();

//function handleEditFormSubmit(evt) {
 // evt.preventDefault();
 // profileName.textContent = userNameInput.value;
 // profileProfession.textContent = userProfessionInput.value;
 // closePopup(userPopup);
//}





//кнопка редактирования
buttonEdit.addEventListener("click", () => {
  popupUserEdit.open();
  userNameInput.value = userInfo.getUserInfo().name;
  userProfessionInput.value = userInfo.getUserInfo().profession;
  profileValidator._resetErrors();
});

buttonAdd.addEventListener("click", () => {
  popupAddCard.open();
  cardValidator._resetErrors();
});









//добавление начальных карточек на страницу
//initialCards.forEach((item) => {
  //cardsContainer.prepend(renderCards(item)) 
//});

//function takeInfo() {
  //userNameInput.value = profileName.textContent;
  //userProfessionInput.value = profileProfession.textContent;
//}

//метод редактирования информации пользователя
//function handleEditFormSubmit(evt) {
 // evt.preventDefault();
 // profileName.textContent = userNameInput.value;
 // profileProfession.textContent = userProfessionInput.value;
 // closePopup(userPopup);
//}

//форма добавления фото в начало массива
//function handleAddPhotoFormSubmit(evt){
  //evt.preventDefault();
  //const item = {
   // name: cardNameInput.value,
   // link: cardLinkInput.value
  //};

 // cardsContainer.prepend(renderCards(item));
 // evt.target.reset();
 // closePopup(cardPopup);
//}

//закрытие попапа редактирования
//userPopupClose.addEventListener("click", () => {
  //closePopup(userPopup);
//});

//закрытие попапа добавления фото
//cardPopupClose.addEventListener("click", () => {
 // closePopup(cardPopup);
//});

//закрытие увеличенного фото
//imgPopupClose.addEventListener("click", () => {
 // closePopup(popupTypeImg);
//});

//слушатели
//popupUserForm.addEventListener("submit", handleEditFormSubmit);
//popupCardForm.addEventListener("submit", handleAddPhotoFormSubmit);