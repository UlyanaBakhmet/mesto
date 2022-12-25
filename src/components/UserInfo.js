export default class UserInfo {
  constructor({ userNameSelector, userProfessionSelector, userAvatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userProfession = document.querySelector(userProfessionSelector);
    this._avatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      //использует значения данных пользователя
      userName: this._userName.textContent,
      userProfession: this._userProfession.textContent,
    };
  }

  setUserInfo({ name, about, avatar }) {
    //принимает новые данные и добавляет их на страницу
    this._userName.textContent = name;
    this._userProfession.textContent = about;
    this._avatar.src = avatar;
  }
}
