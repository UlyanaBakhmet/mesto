//импортируем:
import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards } from "../utils/constants.js";
import { formValSelectors } from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

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

const userForm = userPopup.querySelector(".popup__form");
const cardForm = cardPopup.querySelector(".popup__form");

//валидация форм
const profileValidator = new FormValidator(formValSelectors, userForm);
profileValidator.enableValidation();

const cardValidator = new FormValidator(formValSelectors, cardForm);
cardValidator.enableValidation();

//метод отрисовки изначальных карточек
const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createNewCard(item);
      section.addItem(card);
    },
  },
  ".elements__container"
);

//добавление карточки новой
const createNewCard = (item) => {
  const card = new Card(item, ".card-template", (name, link) => {
    openPhotoPopup.open(name, link);
  });
  return card.createCard();
};

//вызов метода класса Section
section.renderItems();

const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userProfessionSelector: ".profile__profession",
});

const popupUserEdit = new PopupWithForm(".popup_type_user", (inputsValues) => {
  popupUserEdit.close();
  userInfo.setUserInfo(inputsValues);
});
popupUserEdit.setEventListeners();

const popupAddCard = new PopupWithForm(".popup_type_card", (dataCard) => {
  const card = createNewCard(dataCard);
  section.addItem(card);
  popupAddCard.close();
  cardValidator.makeButtonNotActive();
});
popupAddCard.setEventListeners();

const openPhotoPopup = new PopupWithImage(".popup_type_img");
openPhotoPopup.setEventListeners();

//кнопка редактирования
buttonEdit.addEventListener("click", () => {
  popupUserEdit.open();
  popupUserEdit.setInputValues(userInfo.getUserInfo());
  profileValidator.resetErrors();
});

buttonAdd.addEventListener("click", () => {
  popupAddCard.open();
  cardValidator.resetErrors();
});
