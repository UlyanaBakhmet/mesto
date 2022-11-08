export class Card {
 constructor(data, templateSelector, openPhotoPopup) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openPhotoPopup = openPhotoPopup;
 } 

 _getTemplate() {
//забираем разметку из HTML и клонируем элемент
const cardElement = document
.querySelector(this._templateSelector)
.content.querySelector(".card")
.cloneNode(true);

//вернём ДОМ-эл-нт карточки
return cardElement;
 }

//метод создания новой карточки
createCard() {
    //Записываем разметку в приватное поле _element.
    //Таким образом у других элементов появится доступ к ней.
    this._element = this._getTemplate();

    this._cardTitle = this._element.querySelector(".card__name");
    this._cardTitle.textContent = this._name;
  
    this._cardImage = this._element.querySelector(".card__image");
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;

    this._buttonLike = this._element.querySelector(".card__like-button");
    this._buttonDelete = this._element.querySelector(".card__button-delete");

    this._setEventListeners();

    return this._element;
  }

//метод постановки и снятия лайка
 _toggleLike = () => {
    this._buttonLike.classList.toggle("card__like-button_active");
  }

//метод удаления карточки
_deleteCard = () => {
    this._element.remove();
  }

//ставим слушатели
_setEventListeners() {
//слушатель лайка карточки
  this._buttonLike.addEventListener("click", () => {this._toggleLike()});
//слушатель удаления карточки
  this._buttonDelete.addEventListener("click", () => {this._deleteCard()});
//слушатель открытия увеличенного формата карточки
  this._cardImage.addEventListener("click", () => {this._openPhotoPopup(this._link, this._name)});
}

}