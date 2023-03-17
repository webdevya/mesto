class Card {
  constructor(data, cardTemplate) {
    this._link = data.link;
    this._caption = data.caption;
    this._cardTemplate = cardTemplate;
    this._openImagePopupHandler = data.openImagePopupHandler;
    this._favHandler = data.favHandler;
    this._trashHandler = data.trashHandler;
    this._cardSelectors = data.cardSelectors;
  }


  _subscribeFav(card) {
    const btnFav = card.querySelector(this._cardSelectors.favBtnSelector);//('.elements__card-fav-btn');
    btnFav.addEventListener('click', this._favHandler);
  }

  _subscribeTrash(card) {
    const btnTrash = card.querySelector(this._cardSelectors.trashBtnSelector);//('.elements__card-trash-btn');
    btnTrash.addEventListener('click', this._trashHandler);
  }

  _subscribeOpenImg(img) {
    img.addEventListener('click', this._openImagePopupHandler);
  }

  _fillProps(cardElements) {
    cardElements.img.src = this._link;
    cardElements.img.alt = this._caption;
    cardElements.card.querySelector(this._cardSelectors.captionSelector).textContent = this._caption;//('.elements__card-caption-text').textContent = this._caption;
  }

  _getCardElements() {
    const card = this._cardTemplate.cloneNode(true);
    const img = card.querySelector(this._cardSelectors.imageSelector);//('.elements__card-image');

    return { card, img };
  }


  createCard() {

    const elements = this._getCardElements();

    this._fillProps(elements);

    this._subscribeOpenImg(elements.img);

    this._subscribeFav(elements.card);

    this._subscribeTrash(elements.card);

    return elements.card;
  }
}

export default Card;
