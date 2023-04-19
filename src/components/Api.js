import ApiBase from "./ApiBase";

export default class Api extends ApiBase {
  constructor({ baseUrl,
    headers,
  }, { cardLocalUrl, cardLikeLocalUrl, userLocalUrl, userAvatarLocalUrl }) {
    super({ baseUrl, headers });
    this._cardLocalUrl = cardLocalUrl;
    this._cardLikeLocalUrl = cardLikeLocalUrl;
    this._userLocalUrl = userLocalUrl;
    this._userAvatarLocalUrl = userAvatarLocalUrl;
  }

  getInitialCards() {
    return super.getDataJson(this._cardLocalUrl);
  }

  getUserInfo() {
    return super.getDataJson(this._userLocalUrl);
  }

  updateUserProps(userProps) {
    return super.updateData(this._userLocalUrl, userProps);
  }

  updateUserAvatar(avatar) {
    return super.updateData(this._userAvatarLocalUrl, { avatar });
  }

  addCard({ name, link }) {
    return super.addData(this._cardLocalUrl, { name, link });
  }

  deleteCard(id) {
    return super.deleteData(this._cardLocalUrl, id);
  }

  setLike(id) {
    return super.putData(this._cardLocalUrl, null, `${id}/${this._cardLikeLocalUrl}`)
  }

  deleteLike(id) {
    return super.deleteData(this._cardLocalUrl, `${id}/${this._cardLikeLocalUrl}`)
  }
}
