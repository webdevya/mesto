export default class UserInfo {
  constructor({
    profileNameSelector,
    profileAboutSelector,
    profileAvatarSelector }) {
    this._profileNameElement = document.querySelector(profileNameSelector);
    this._profileAboutElement = document.querySelector(profileAboutSelector);
    this._profileAvatarElement = document.querySelector(profileAvatarSelector);
  }

  setUserInfo({ name, about, avatar, id, cohort }) {
    this.updateUserInfoProps({ name, about });
    this.updateAvatar(avatar);
    this._id = id;
    this._cohort = cohort;
  }

  updateUserInfoProps({ name, about }) {
    this._profileNameElement.textContent = name;
    this._profileAboutElement.textContent = about;
    this._profileAvatarElement.alt = name;
  }

  updateAvatar(avatar) {
    this._profileAvatarElement.src = avatar;
  }

  getUserInfo() {
    return { 'profile-name': this._profileNameElement.textContent, 'profile-about': this._profileAboutElement.textContent };
  }

  get id() {
    return this._id;
  }

}

