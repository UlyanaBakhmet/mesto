//класс валидации формы
export class FormValidator {
  constructor(data, formElement) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data._errorClass;
    this._formElement = formElement;

//находим все поля внутри формы, делаем из них массив методом array
this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
//находим в текущей форме кнопку отправки
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
  //проходим по этому массиву методом Some
  return this._inputList.some((inputElement) => {
    //если поле не валидно, колбэк вернет true
    //обход массива прекратится и вся функция эта ф-ия вернет true
    return !inputElement.validity.valid;
  });
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

// смена состояния кнопки отправки - если хоть что-то не соответствует
// правилам ввода - кнопка не активна. Если все соответствует - активна
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
  //обойдем все элементы полученной коллекции
  this._inputList.forEach((inputElement) => {
    //каждому полю добавим обработчик события input
    inputElement.addEventListener("input", () => {
      //внутри колбэка вызовем checkInputValidity, передав ей форму и проверяемый элемент
      this._checkInputValidity(inputElement);

      this._toggleButtonState();
    });
  });
};

//запускаем валидацию
enableValidation() {
  this._setEventListeners();
};
}