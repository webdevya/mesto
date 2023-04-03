class Card {
  constructor(
    { link, caption },
    { favBtnSelector, trashBtnSelector, captionSelector, imageSelector },
    cardTemplate,
    { openImagePopupHandler, favHandler, trashHandler }) {
    this._link = link;
    this._caption = caption;
    this._cardTemplate = cardTemplate;
    this._openImagePopupHandler = openImagePopupHandler;
    this._favHandler = favHandler;
    this._trashHandler = trashHandler;
    this._favBtnSelector = favBtnSelector;
    this._trashBtnSelector = trashBtnSelector;
    this._captionSelector = captionSelector;
    this._imageSelector = imageSelector;
  }

  _subscribeFav(card) {
    const btnFav = card.querySelector(this._favBtnSelector);
    btnFav.addEventListener('click', this._favHandler);
  }

  _subscribeTrash(card) {
    const btnTrash = card.querySelector(this._trashBtnSelector);
    btnTrash.addEventListener('click', this._trashHandler);
  }

  _subscribeOpenImg(img) {
    img.addEventListener('click', this._openImagePopupHandler);
  }

  _fillProps(cardElements) {
    cardElements.img.src = this._link;
    cardElements.img.alt = this._caption;
    cardElements.card.querySelector(this._captionSelector).textContent = this._caption;
  }

  _getCardElements() {
    const card = this._cardTemplate.cloneNode(true);
    const img = card.querySelector(this._imageSelector);

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
