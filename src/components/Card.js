export default class Card {
  constructor(dataCard, templateSelector, handleCardClick, handleTrashClick, handleLikeClick, userId) {
    this._dataCard = dataCard;
    this._templateSelector = templateSelector;

    this._name = dataCard.name;
    this._link = dataCard.link;
    this._likes = dataCard.likes;
    this._id = dataCard._id;

    this._userId = userId;
    this._ownerId = dataCard.owner._id;

    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._handleLikeClick = handleLikeClick;
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
    this.setCardLike(this._likes);

    if (this._userId !== this._ownerId) {
      this._buttonDelete.remove();
      this._buttonDelete = null;
    }
    return this._element;
  }

  _activeLike() {
    this._buttonLike.classList.add("card__like-button_active");
  }

  _deactiveLike() {
    this._buttonLike.classList.remove("card__like-button_active");
  }

  isLiked() {
    return this._likes.some((userLike) => userLike._id === this._userId);
  }

  //счётчик лайков
  setCardLike(newLikes) {
    this._likes = newLikes;
    const likeCounter = this._element.querySelector(".card__like-calculator");

    if (this.isLiked()) {
      this._activeLike();
    } else {
      this._deactiveLike();
    }

    likeCounter.textContent = this._likes.length;
  }

  deleteMyCard = () => {
    this._element.remove();
    this._element = null;
  };

  _setEventListeners() {
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );
    this._buttonLike.addEventListener("click", () =>
      this._handleLikeClick(this._id)
    );
    this._buttonDelete.addEventListener("click", () =>
      this._handleTrashClick(this._id)
    );
  }
}
