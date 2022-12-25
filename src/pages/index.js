//импортируем:
import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards } from "../utils/constants.js";
import { formValSelectors } from "../utils/constants.js";
import { apiConfig } from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

const userPopup = document.querySelector(".popup_type_user");
const popupUserForm = userPopup.querySelector(".popup__form_type_user");
const userNameInput = userPopup.querySelector(".popup__input_type_name");
const userProfessionInput = userPopup.querySelector(
  ".popup__input_type_profession"
);

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
const avatarPopup = document.querySelector(".popup_type_edit-avatar");

const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileProfession = profile.querySelector(".profile__profession");
const buttonEdit = profile.querySelector(".profile__edit-button");
const buttonEditAvatar = profile.querySelector(".profile__avatar-edit-button");
const avatarProfile = profile.querySelector(".profile__avatar");

const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_card-link");

const userForm = userPopup.querySelector(".popup__form");
const cardForm = cardPopup.querySelector(".popup__form");
const avatarForm = avatarPopup.querySelector(".popup__form");
const avatarProfileEdit = document.querySelector(".profile__box");

const confirmationPopup = document.querySelector(".popup_type_confirm");

//валидация
const profileValidator = new FormValidator(formValSelectors, userForm);
profileValidator.enableValidation();

const cardValidator = new FormValidator(formValSelectors, cardForm);
cardValidator.enableValidation();

const avatarValidator = new FormValidator(formValSelectors, avatarForm);
avatarValidator.enableValidation();

let userId;

const api = new Api(apiConfig);

// инициализация начальных данных
Promise.all([api.getUsersInfo(), api.getInitialCards()])
  .then(([me, cards]) => {
    userId = me._id;
    userInfo.setUserInfo(me);
    section.renderItems(cards);
  })
  .catch((err) => console.log(err))
  .finally(() => {});


const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userProfessionSelector: ".profile__profession",
  userAvatarSelector: ".profile__avatar",
});


const section = new Section(
  (card) => createNewCard(card),
  ".elements__container"
);


const openPhotoPopup = new PopupWithImage(".popup_type_img");
openPhotoPopup.setEventListeners();


const popupWithConfirmation = new PopupWithConfirmation(".popup_type_confirm");
popupWithConfirmation.setEventListeners();


const popupUserEdit = new PopupWithForm(".popup_type_user", (data) => {
  const { userName, userProfession } = data;
  popupUserEdit.renderLoading(true);
  api
    .editUsersInfo(userName, userProfession)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupUserEdit.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupUserEdit.renderLoading(false));
});
popupUserEdit.setEventListeners();


const popupAvatarEdit = new PopupWithForm(".popup_type_edit-avatar", (data) => {
  popupAvatarEdit.renderLoading(true);
  api
    .editAvatar(data)
    .then((formData) => {
      userInfo.setUserInfo(formData);
      popupAvatarEdit.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupAvatarEdit.renderLoading(false));
});
popupAvatarEdit.setEventListeners();


const popupAddCard = new PopupWithForm(".popup_type_card", (dataCard) => {
  popupAddCard.renderLoading(true);
  const { name, link } = dataCard;
  api
    .addNewCard(name, link)
    .then((newDataCard) => {
      const card = createNewCard(newDataCard);
      section.addItem(card);
      cardValidator.makeButtonNotActive();
      popupAddCard.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupAddCard.renderLoading(false));
});
popupAddCard.setEventListeners();


const createNewCard = (dataCard) => {
  const card = new Card(
    dataCard,
    ".card-template",
    (name, link) => {
      openPhotoPopup.open(name, link);
    },
    (id) => {
      popupWithConfirmation.open();
      popupWithConfirmation.setSubmitHandlers(() => {
        popupWithConfirmation.renderLoading(true);
        api
          .deleteCard(id)
          .then((res) => {
            card.deleteMyCard(res);
            popupWithConfirmation.close();
          })
          .catch((err) => console.log(err))
          .finally(() => popupWithConfirmation.renderLoading(false));
      });
    },
    (id) => {
      if (!card.isLiked()) {
        api
          .addLike(id)
          .then((data) => {
            card.setCardLike(data.likes);
          })
          .catch((err) => console.log(err));
      } else {
        api
          .deleteLike(id)
          .then((data) => {
            card.setCardLike(data.likes);
          })
          .catch((err) => console.log(err));
      }
    },
    userId
  );
  return card.createCard();
};


//кнопка редактирования
buttonEdit.addEventListener("click", () => {
  popupUserEdit.setInputValues(userInfo.getUserInfo());
  profileValidator.makeButtonNotActive();
  profileValidator.resetErrors();
  popupUserEdit.open();
});

buttonAdd.addEventListener("click", () => {
  cardValidator.resetErrors();
  popupAddCard.open();
});

buttonEditAvatar.addEventListener("click", () => {
  avatarValidator.resetErrors();
  popupAvatarEdit.open();
});