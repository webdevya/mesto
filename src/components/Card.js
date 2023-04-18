class Card {
  constructor(
    { caption, link, id, likes, isLiked, isOwner, createDate },
    { favBtnSelector, trashBtnSelector, captionSelector, imageSelector, favBtnChekedClass },
    cardTemplate,
    handleCardClick) {
    this._link = link;
    this._caption = caption;
    this._id = id;
    this._likes = likes;
    this._isOwner = isOwner;
    this._isLiked = isLiked;
    this._createDate = createDate;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._favBtnSelector = favBtnSelector;
    this._trashBtnSelector = trashBtnSelector;
    this._captionSelector = captionSelector;
    this._imageSelector = imageSelector;
    this._favBtnCheckedClass = favBtnChekedClass;
  }

  _subscribeFav = (subscribe = true) => {
    if (subscribe)
      this._favBtn.addEventListener('click', this._toggleFavState);
    else
      this._favBtn.removeEventListener('click', this._toggleFavState);
  }

  _subscribeTrash = (subscribe = true) => {
    if (this._isOwner) {
      if (subscribe)
        this._btnTrash.addEventListener('click', this._removeCard);
      else
        this._btnTrash.removeEventListener('click', this._removeCard);
    }
  }

  _openImg = () => {
    this._handleCardClick({ caption: this._caption, link: this._link });
  }

  _subscribeOpenImg = (subscribe = true) => {
    if (subscribe)
      this._img.addEventListener('click', this._openImg);
    else
      this._img.removeEventListener('click', this._openImg);
  }

  _subscribeElements = (subscribe = true) => {
    this._subscribeOpenImg(subscribe);
    this._subscribeFav(subscribe);
    this._subscribeTrash(subscribe);
  }

  _fillProps = (cardElements) => {
    cardElements.img.src = this._link;
    cardElements.img.alt = this._caption;
    cardElements.card.querySelector(this._captionSelector).textContent = this._caption;

    if (this._isLiked)
      this._toggleFavState();
  }

  _getCardElements = () => {
    const card = this._cardTemplate.cloneNode(true);
    const img = card.querySelector(this._imageSelector);
    const btnTrash = card.querySelector(this._trashBtnSelector);
    if (!this._isOwner) {
      btnTrash.remove();
    }
    const favBtn = card.querySelector(this._favBtnSelector);
    return { card, img, btnTrash, favBtn };
  }

  _saveElements = ({ card, img, btnTrash, favBtn }) => {
    this._favBtn = favBtn;
    this._card = card;
    this._btnTrash = btnTrash;
    this._img = img;
  }

  _addCardBehaviour = ({ card, img, btnTrash, favBtn }) => {
    this._saveElements({ card, img, btnTrash, favBtn });
    this._subscribeElements(true);
  }
  _removeCardBehaviuor = () => {
    this._subscribeElements(false);
    this._saveElements({});
  }

  _toggleFavState = () => {
    this._favBtn.classList.toggle(this._favBtnCheckedClass);//('elements__card-fav-btn_state_checked');
  }

  _removeCard = () => {
    this._card.remove();
    this._removeCardBehaviuor();
  }

  createCard() {
    const elements = this._getCardElements();
    this._fillProps(elements);
    this._addCardBehaviour(elements);

    return elements.card;
  }
}

export default Card;
