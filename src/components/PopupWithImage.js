import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector, popupOpenedClass, closeBtnSelector, popupViewImgSelector, popupViewImgCaptionSelector }) {
    super({ popupSelector, popupOpenedClass, closeBtnSelector });
    this._popupViewImgImage = this._popup.querySelector(popupViewImgSelector);
    this._popupViewImgCaption = this._popup.querySelector(popupViewImgCaptionSelector);
    this.open = this.open.bind(this);
  }

  open({ caption, link }) {
    // const img = evt.currentTarget;
    // const caption = img.getAttribute('alt');
    // const src = img.getAttribute('src');

    this._popupViewImgImage.setAttribute('alt', caption);
    this._popupViewImgImage.setAttribute('src', link);

    this._popupViewImgCaption.textContent = caption;

    super.open();
  }
}
