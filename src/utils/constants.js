const gridPhoto1 = new URL("../images/gridPhoto1.jpg", import.meta.url);
const gridPhoto2 = new URL("../images/gridPhoto2.jpg", import.meta.url);
const gridPhoto3 = new URL("../images/gridPhoto3.jpg", import.meta.url);
const gridPhoto4 = new URL("../images/gridPhoto4.jpeg", import.meta.url);
const gridPhoto5 = new URL("../images/gridPhoto5.jpg", import.meta.url);
const gridPhoto6 = new URL("../images/gridPhoto6.jpg", import.meta.url);

export const initialCards = [
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

export const formValSelectors = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save-button",
    inactiveButtonClass: "popup__save-button_notactive",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_active",
  };

//экземпляр класса АПИ для работы с сервером
export const apiConfig = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-54',
    headers: {
    authorization: '070a38fd-7788-4fe4-9dbb-7187d1c3352a',
    "Content-Type": "application/json",
  },
  };