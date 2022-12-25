import Popup from "../components/Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._confirmButton = this._popup.querySelector(".popup__save-button");
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._confirmButton.textContent = "Удаление...";
    } else {
      this._confirmButton.textContent = "Да";
    }
  }

  setSubmitHandlers(submitHandlers) {
    this._handleFormSubmit = submitHandlers;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }
}
