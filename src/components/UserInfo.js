export default class UserInfo {
  // constructor({
  //   profileNameSelector,
  //   profileAboutSelector }) {

  //   this._profileNameElement = document.querySelector(profileNameSelector);
  //   this._profileAboutElement = document.querySelector(profileAboutSelector);
  setUserInfo({ name, about, avatar, id, cohort }) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
    this._id = id;
    this._cohort = cohort;
  }



  get name() {
    return this._name;
  }
  get about() {
    return this._about;
  }
  get avatar() {
    return this._avatar;
  }

  get id() {
    return this._id;
  }

}


  // getUserInfo() {
  //   const info = {};
  //   info['profile-name'] = this._profileNameElement.textContent;
  //   info['profile-about'] = this._profileAboutElement.textContent;
  //   return info;
  // }

  // setUserInfo({ 'profile-name': name, 'profile-about': about }) {
  //   this._profileNameElement.textContent = name;
  //   this._profileAboutElement.textContent = about;
  // }
//}
