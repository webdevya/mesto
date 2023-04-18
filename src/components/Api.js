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

  addCard({ name, link }) {
    return super.addData(this._cardLocalUrl, { name, link });
  }

  deleteCard(id) {
    return super.deleteData(this._cardLocalUrl, id);
  }
}
