//класс валидации формы
export default class FormValidator {
  constructor(data, formElement) {
    this._data = data;
    this._formElement = formElement;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
}

//проверка валидности
_checkInputValidity(inputElement) {
  if (!inputElement.validity.valid) {
    this._showError(inputElement, inputElement.validationMessage);
  } else {
    this._hideError(inputElement);
  }
};

//проверяем на неправильный ввод
_hasInvalidInput() {
  return this._inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

//активация кнопки отправки
_buttonActive() {
  this._buttonElement.classList.add(this._inactiveButtonClass);
  this._buttonElement.setAttribute("disabled", true);
};

//инактивация кнопки отправки
_buttonNotActive() {
  this._buttonElement.classList.remove(this._inactiveButtonClass);
  this._buttonElement.removeAttribute("disabled");
};

//Смена состояния кнопки отправки - если что-то не так - кнопка не активна
//Если все ок - активна
_toggleButtonState() {
  if (this._hasInvalidInput()) {
    this._buttonActive();
  } else {
    this._buttonNotActive();
  }
};

//отображение ошибки
_showError(inputElement, errorMessage) {
 this._errorSpan = this._formElement.querySelector(`.${inputElement.id}-error`);
  
  inputElement.classList.add(this._inputErrorClass);
  
  this._errorSpan.classList.add(this._errorClass);
  this._errorSpan.textContent = errorMessage;
};

//скрываем ошибки
_hideError(inputElement) {
  this._errorSpan = this._formElement.querySelector(`.${inputElement.id}-error`);
  
  inputElement.classList.remove(this._inputErrorClass);
  
  this._errorSpan.classList.remove(this._errorClass);
  this._errorSpan.textContent = "";
};

//функция сброса ошибок
_resetErrors() {
  this._inputList.forEach((inputElement) => {
    this._hideError(inputElement);

    this._toggleButtonState();
  });
};

_setEventListeners() {
  this._inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      this._checkInputValidity(inputElement);

      this._toggleButtonState();
    });
  });
};

//запускаем валидацию
enableValidation() {
  this._setEventListeners();
}
}