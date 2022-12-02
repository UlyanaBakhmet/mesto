export default class UserInfo {
   constructor({ userName, userProfession }) {
    this._name = document.querySelector(userName);
    this._profession = document.querySelector(userProfession);
   }

getUserInfo() {
    const userInfo = {
     //return {
        //использует значения данных пользователя
        name: this._name.textContent,
        profession: this._profession.textContent,
    };
    return userInfo;
}

setUserInfo(inputValues) {
    //вообще-то должен принимать новые данные и добавлять их на страницу
    //но у меня не добавляет и не обновляет
    this._name.textContent = inputValues.name;
    this._profession.textContent = inputValues.profession;
}
}