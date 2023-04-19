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

  _subscribeFav = (subscribe = true) => {
    if (subscribe)
      this._favBtn.addEventListener('click', this._updateFavState);
    else
      this._favBtn.removeEventListener('click', this._updateFavState);
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
    this._fillFavCount();
  }

  _fillFavCount = () => {
    this._favCount.textContent = this._likes;
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
    this._subscribeElements(true);

    if (this._isLiked)
      this._toggleFavState();
  }
  // _removeCardBehaviuor = () => {
  //   this._subscribeElements(false);
  //   this._saveElements({});
  // }

  _updateFavState = () => {
    this._handleToggleFavState(this._id, this._favBtn.classList.contains(this._favBtnCheckedClass))
      .then(res => {
        this._likes = res.likes.length;
        this._isLiked = !this._isLiked;
        return Promise.resolve(this._likes);
      })
      .then((res) => { this._fillFavCount(); return Promise.resolve(res); })
      .then(() => { this._toggleFavState(); })
      .catch(err => { console.log(err); });
  }

  _toggleFavState = () => {
    this._favBtn.classList.toggle(this._favBtnCheckedClass);
  }

  _removeCard = () => {
    this._handleDeleteCard(this);
  }

  removeCard = () => {
    this._card.remove();
  }

  get id() {
    return this._id;
  }

  // _removeCard = () => {

  //   this._handleDeleteCard(this._id)
  //     .then(res => {
  //       this._card.remove();
  //       //this._removeCardBehaviuor();
  //     })
  //     .catch(err => { console.log(err); });
  // }

  createCard() {
    const elements = this._getCardElements();

    this._addCardBehaviour(elements);
    this._fillProps(elements);

    return elements.card;
  }
}

export default Card;
