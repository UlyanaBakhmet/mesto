//отвечает за открытие и  закрытие попапа
export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

//открытие попапа
open() {
    this._popup.classList.add("popup_opened");
    //слушатель для закрытия попапа через Escape
    document.addEventListener("keydown", this._handleEscClose);  
  };

//закрытие попапа
close() {
    this._popup.classList.remove("popup_opened");
    //удаление слушателя для закрытия через кнопку Escape
    document.removeEventListener("keydown", this._handleEscClose);
  };

//закрытие попапа через кнопку Escape
_handleEscClose = (evt) => {
    if (evt.key === "Escape") {
        this.close();
    };
  };

//закрытие попапа через Оверлей
setEventListeners() {
  this._popup.addEventListener("mousedown", (evt) => {
      if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close-button")
    ) {
      this.close();
    }
});
}
}