//класс валидации формы
export default class FormValidator {
  constructor(selectors, form) {
    this._selectors = selectors;
    this._form = form;
    this._inputSelector = this._selectors.inputSelector;
    this._submitButtonSelector = selectors.submitButtonSelector;
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
  }

  //проверка валидности
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage);
    } else {
      this._hideError(inputElement);
    }
  }

  //проверяем на неправильный ввод
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //активируем кнопку отправки
  _makeButtonActive() {
    this._buttonElement.classList.remove(this._selectors.inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  //блокируем кнопку отправки
  makeButtonNotActive() {
    this._buttonElement.classList.add(this._selectors.inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  //Смена состояния кнопки отправки - если что-то не так - кнопка не активна
  //Если все ок - активна
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.makeButtonNotActive();
    } else {
      this._makeButtonActive();
    }
  }

  //отображение ошибки
  _showError(inputElement, errorMessage) {
    const { inputErrorClass, errorClass } = this._selectors;
    const errorSpan = this._form.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(inputErrorClass);

    errorSpan.classList.add(errorClass);
    errorSpan.textContent = errorMessage;
  }

  //скрываем ошибки
  _hideError(inputElement) {
    const { inputErrorClass, errorClass } = this._selectors;
    const errorSpan = this._form.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(inputErrorClass);

    errorSpan.classList.remove(errorClass);
    errorSpan.textContent = "";
  }

  //функция сброса ошибок
  resetErrors() {
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement);

      this._toggleButtonState();
    });
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);

        this._toggleButtonState();
      });
    });
  }

  //запускаем валидацию
  enableValidation() {
    this._setEventListeners();
  }
}
