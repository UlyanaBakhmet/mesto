//создаём объект валидации с нужными классами
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_notactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_active",
};

//проверка на валидацию для инпута
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else {
    hideError(formElement, inputElement, validationConfig);
  }
};

const setEventListeners = (
  formElement,
  { inputSelector, submitButtonSelector, inactiveButtonClass }
) => {
  //находим все поля внутри формы, делаем из них массив методом array
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  //находим в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(submitButtonSelector);

  //обойдем все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    //каждому полю добавим обработчик события input
    inputElement.addEventListener("input", () => {
      //внутри колбэка вызовем checkInputValidity, передав ей форму и проверяемый элемент
      checkInputValidity(formElement, inputElement);

      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

//запускаем валидацию
const enableValidation = ({ formSelector, ...settings }) => {
  //найдем все формы с указанным классом в DOM
  //сделаем из них массив методом Array
  const formList = Array.from(document.querySelectorAll(formSelector));

  //перебираем полученную коллекцию
  formList.forEach((formElement) => {
    //для каждой формы вызовем слушатель
    //передав ей элемент формы
    setEventListeners(formElement, settings);
  });
};

//проверяем на неправильный ввод
const hasInvalidInput = (inputList) => {
  //проходим по этому массиву методом Some
  return inputList.some((inputElement) => {
    //если поле не валидно, колбэк вернет true
    //обход массива прекратится и вся функция эта ф-ия вернет true
    return !inputElement.validity.valid;
  });
};

//активация кнопки отправки
const buttonActive = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute("disabled", true);
};

//инактивация кнопки отправки
const buttonNotActive = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute("disabled");
};

// смена состояния кнопки отправки - если хоть что-то не соответствует
// правилам ввода - кнопка не активна. Если все соответствует - активна
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonActive(buttonElement, inactiveButtonClass);
  } else {
    buttonNotActive(buttonElement, inactiveButtonClass);
  }
};

//отображение ошибки
const showError = (
  formElement,
  inputElement,
  errorMessage,
  { inputErrorClass, errorClass }
) => {
  inputElement.classList.add(inputErrorClass);
  //находим элемент ошибки внутри самой функции
  const errorSpan = formElement.querySelector(`.${inputElement.id}-error`);
  errorSpan.classList.add(errorClass);
  errorSpan.textContent = errorMessage;
};

//скрываем ошибки
const hideError = (
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) => {
  inputElement.classList.remove(inputErrorClass);
  //находим элемент ошибки
  const errorSpan = formElement.querySelector(`.${inputElement.id}-error`);
  errorSpan.classList.remove(errorClass);
  errorSpan.textContent = "";
};

//функция сброса ошибок
function resetErrors(formElement, object) {
  const inputList = Array.from(
    formElement.querySelectorAll(object.inputSelector)
  );
  const buttonElement = formElement.querySelector(object.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideError(formElement, inputElement, object);

    toggleButtonState(inputList, buttonElement, object.inactiveButtonClass);
  });
}

//вызываем функцию
enableValidation(validationConfig);
