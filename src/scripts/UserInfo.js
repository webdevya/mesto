export default class UserInfo {
  constructor({
    profileNameSelector,
    profileAboutSelector }) {

    this._profileNameElement = document.querySelector(profileNameSelector);
    this._profileAboutElement = document.querySelector(profileAboutSelector);
  }

  getUserInfo() {
    const info = {};
    info['profile-name'] = this._profileNameElement.textContent;
    info['profile-about'] = this._profileAboutElement.textContent;
    return info;
  }

  setUserInfo({ 'profile-name': name, 'profile-about': about }) {
    this._profileNameElement.textContent = name;
    this._profileAboutElement.textContent = about;
  }
}
