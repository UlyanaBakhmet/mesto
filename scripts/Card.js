export default class Card {
 constructor(dataCard, templateSelector, handleCardClick) {
    this._dataCard = dataCard;
    this._name = dataCard.name;
    this._link = dataCard.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
 } 

 _getTemplate() {
const cardElement = document
.querySelector(this._templateSelector)
.content.querySelector(".card")
.cloneNode(true);

//вернём ДОМ-эл-нт карточки
return cardElement;
 }

//метод создания новой карточки
createCard() {
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
    this._element = null;
  }
 
//ставим слушатели
 _setEventListeners() {
  //слушатель лайка карточки
    this._buttonLike.addEventListener("click", () => {this._toggleLike()});
  //слушатель удаления карточки
    this._buttonDelete.addEventListener("click", () => {this._deleteCard()});
    //слушатель открытия увеличенного формата карточки
    this._cardImage.addEventListener("click", () => this._handleCardClick(this._name, this._link));
  }
}