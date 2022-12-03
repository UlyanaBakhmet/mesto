import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imgZoom = this._popup.querySelector(".popup__img");
    this._imgFigcaption = this._popup.querySelector(".popup__figcaption");
  }

  //открыть фото для увеличения картинки
  open(name, link) {
    this._imgZoom.alt = name;
    this._imgZoom.src = link;
    this._imgFigcaption.textContent = name;
    super.open();
  }
}
