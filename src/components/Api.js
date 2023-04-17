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





}
