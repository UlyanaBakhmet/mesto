//импортируем:
import {initialCards} from './cards.js';
import {FormValidator} from './FormValidator.js';
import {Card} from './Card.js';

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

//вызываем валидацию формы создания карточки
//сначала передаём классы форм, затем форму профиля
const profileValidator = new FormValidator(validationConfig, popupUserForm);
profileValidator.enableValidation();

const cardValidator = new FormValidator(validationConfig, popupCardForm);
cardValidator.enableValidation();

//добавление начальных карточек на страницу
initialCards.forEach((item) => {
  cardsContainer.prepend(renderCards(item)) 
});

//добавление карточки
function renderCards(item) {
  const card = new Card(item, '.card-template', openPhotoPopup);
  const cardContainer = card.createCard();
  return cardContainer;
}

function takeInfo() {
  userNameInput.value = profileName.textContent;
  userProfessionInput.value = profileProfession.textContent;
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  //слушатель для закрытия попапа через Escape
  document.addEventListener("keydown", closePopupByEsc);
  //слушатель для закрытия попапа через Оверлей
  popup.addEventListener("mousedown", closePopupByOverlay);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  //удаление слушателя для закрытия через кнопку Escape
  document.removeEventListener("keydown", closePopupByEsc);
  //удаление слушателя для закрытия через Оверлей
  popup.removeEventListener("mousedown", closePopupByOverlay);
}

//закрытие попапа через кнопку Escape
function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

//закрытие попапа через Оверлей
function closePopupByOverlay(evt) {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close-button")
  ) {
    closePopup(evt.target);
  }
}

//открыть фото для увеличения картинки
function openPhotoPopup (link, name) {
  openPopup(popupTypeImg);
  imgZoom.src = link;
  imgZoom.alt = name;
  imgFigcaption.textContent = name;
}

//метод редактирования информации пользователя
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = userNameInput.value;
  profileProfession.textContent = userProfessionInput.value;
  closePopup(userPopup);
}

//форма добавления фото в начало массива
function handleAddPhotoFormSubmit(evt){
  evt.preventDefault();
  const item = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  };

  cardsContainer.prepend(renderCards(item));
  evt.target.reset();
  closePopup(cardPopup);
}

//кнопка редактирования
buttonEdit.addEventListener("click", () => {
  openPopup(userPopup);
  takeInfo();
  profileValidator._resetErrors();
});

//кнопка добавления
buttonAdd.addEventListener("click", () => {
  openPopup(cardPopup);
  popupCardForm.reset();
  cardValidator._resetErrors();
});


//закрытие попапа редактирования
userPopupClose.addEventListener("click", () => {
  closePopup(userPopup);
});

//закрытие попапа добавления фото
cardPopupClose.addEventListener("click", () => {
  closePopup(cardPopup);
});

//закрытие увеличенного фото
imgPopupClose.addEventListener("click", () => {
  closePopup(popupTypeImg);
});

//слушатели
popupUserForm.addEventListener("submit", handleEditFormSubmit);
popupCardForm.addEventListener("submit", handleAddPhotoFormSubmit);