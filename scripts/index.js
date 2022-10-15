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

//добавление карточки
function createCard(name, link) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__name");
  const cardImage = cardElement.querySelector(".card__image");
  const buttonLike = cardElement.querySelector(".card__like-button");
  const buttonDelete = cardElement.querySelector(".card__button-delete");
  cardImage.src = link;
  cardTitle.alt = name;
  cardTitle.textContent = name;
  buttonLike.addEventListener("click", () => toggleLike(buttonLike));
  buttonDelete.addEventListener("click", () => deleteCard(buttonDelete));
  cardImage.addEventListener("click", () => openPhotoPopup(link, name));
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
  profileName.textContent = userNameInput.value;
  profileProfession.textContent = userProfessionInput.value;
  closePopup(userPopup);
}

//форма добавления фото (в начало массива)
function handleAddPhotoFormSubmit(evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard(cardNameInput.value, cardLinkInput.value));
  evt.target.reset();
  closePopup(cardPopup);
}

//удаление карточки
function deleteCard(button) {
  const cardItem = button.closest(".card");
  cardItem.remove();
}

function takeInfo() {
  userNameInput.value = profileName.textContent;
  userProfessionInput.value = profileProfession.textContent;
}

//открыть фото
function openPhotoPopup(link, name) {
  openPopup(popupTypeImg);
  imgZoom.src = link;
  imgZoom.alt = name;
  imgFigcaption.textContent = name;
}

function openPopup(popup) {
  popup.classList.add("popup_opened");

  //слушатель для закрытия попапа через Escape
  document.addEventListener("keydown", closePopupByEsc);

  //слушатель для закрытия попапа через Оверлей
  popup.addEventListener("click", closePopupByOverlay);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");

  //удаление слушателя для закрытия через кнопку Escape
  document.removeEventListener("keydown", closePopupByEsc);

  //удаление слушателя для закрытия через Оверлей
  popup.removeEventListener("click", closePopupByOverlay);
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

function toggleLike(button) {
  button.classList.toggle("card__like-button_active");
}

//кнопка редактирования
buttonEdit.addEventListener("click", () => {
  openPopup(userPopup);
  takeInfo();
  resetErrors(userPopup, validationConfig);
});

//кнопка добавления
buttonAdd.addEventListener("click", () => {
  openPopup(cardPopup);
  popupCardForm.reset();
  resetErrors(cardPopup, validationConfig);
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
