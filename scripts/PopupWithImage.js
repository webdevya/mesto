import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector, popupOpenedClass, closeBtnSelector, popupViewImgSelector, popupViewImgCaptionSelector }) {
    super({ popupSelector, popupOpenedClass, closeBtnSelector });
    this._popupViewImgImage = super._popup.querySelector(popupViewImgSelector);
    this._popupViewImgCaption = super._popup.querySelector(popupViewImgCaptionSelector);
  }

  open(evt) {
    const img = evt.currentTarget;
    const caption = img.getAttribute('alt');
    const src = img.getAttribute('src');

    this._popupViewImgImage.setAttribute('alt', caption);
    this._popupViewImgImage.setAttribute('src', src);

    this._popupViewImgCaption.textContent = caption;

    super.open();
  }
}
