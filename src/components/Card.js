class Card {
  constructor(
    { caption, link, id, likes, isLiked, isOwner, createDate },
    { favBtnSelector, trashBtnSelector, captionSelector, imageSelector, favCountSelector, favBtnChekedClass },
    cardTemplate,
    { handleCardClick, handleDeleteCard, handleToggleFavState }) {
    this._link = link;
    this._caption = caption;
    this._id = id;
    this._likes = likes;
    this._isOwner = isOwner;
    this._isLiked = isLiked;
    this._createDate = createDate;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleToggleFavState = handleToggleFavState;
    this._favBtnSelector = favBtnSelector;
    this._trashBtnSelector = trashBtnSelector;
    this._captionSelector = captionSelector;
    this._imageSelector = imageSelector;
    this._favCountSelector = favCountSelector;
    this._favBtnCheckedClass = favBtnChekedClass;
  }

  _subscribeFav = () => {
    this._favBtn.addEventListener('click', this._updateFavState);
  }

  _subscribeTrash = () => {
    if (this._isOwner)
      this._btnTrash.addEventListener('click', this._removeCard);
  }

  _openImg = () => {
    this._handleCardClick({ caption: this._caption, link: this._link });
  }

  _subscribeOpenImg = () => {
    this._img.addEventListener('click', this._openImg);
  }

  _subscribeElements = () => {
    this._subscribeOpenImg();
    this._subscribeFav();
    this._subscribeTrash();
  }

  _fillProps = (cardElements) => {
    cardElements.img.src = this._link;
    cardElements.img.alt = this._caption;
    cardElements.card.querySelector(this._captionSelector).textContent = this._caption;
    this.updateFavCount(this._likes);
  }


  _getCardElements = () => {
    const card = this._cardTemplate.cloneNode(true);
    const img = card.querySelector(this._imageSelector);
    const btnTrash = card.querySelector(this._trashBtnSelector);
    if (!this._isOwner) {
      btnTrash.remove();
    }
    const favBtn = card.querySelector(this._favBtnSelector);
    const favCount = card.querySelector(this._favCountSelector);
    return { card, img, btnTrash, favBtn, favCount };
  }

  _saveElements = ({ card, img, btnTrash, favBtn, favCount }) => {
    this._favBtn = favBtn;
    this._card = card;
    this._btnTrash = btnTrash;
    this._img = img;
    this._favCount = favCount;
  }

  _addCardBehaviour = ({ card, img, btnTrash, favBtn, favCount }) => {
    this._saveElements({ card, img, btnTrash, favBtn, favCount });
    this._subscribeElements();

    this.toggleFavState(this._isLiked);
  }

  _updateFavState = () => {
    this._handleToggleFavState(this._id, this._isLiked);
  }

  _removeCard = () => {
    this._handleDeleteCard(this);
  }

  removeCard = () => {
    this._card.remove();
  }

  toggleFavState = (isLiked) => {
    this._isLiked = isLiked;
    if (isLiked)
      this._favBtn.classList.add(this._favBtnCheckedClass);
    else
      this._favBtn.classList.remove(this._favBtnCheckedClass);
  }

  updateFavCount = (favCount) => {
    this._likes = favCount;
    this._favCount.textContent = favCount;
  }

  get id() {
    return this._id;
  }


  createCard() {
    const elements = this._getCardElements();

    this._addCardBehaviour(elements);
    this._fillProps(elements);

    return elements.card;
  }
}

export default Card;
