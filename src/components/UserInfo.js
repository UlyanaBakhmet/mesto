export default class UserInfo {
  constructor({ userNameSelector, userProfessionSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userProfession = document.querySelector(userProfessionSelector);
  }

  getUserInfo() {
    return {
      //использует значения данных пользователя
      userName: this._userName.textContent,
      userProfession: this._userProfession.textContent,
    };
  }

  setUserInfo(item) {
    //принимает новые данные и добавляет их на страницу
    this._userName.textContent = item.userName;
    this._userProfession.textContent = item.userProfession;
  }
}
