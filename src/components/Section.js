export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(item) {
    //метод принимает ДОМ-эл-нт и добавляет его в контейнер
    this._container.prepend(item);
  }

  //Функция отрисовки начальных данных
  renderItems(items) {
    items.forEach((item) => {
      this._container.append(this._renderer(item));
    });
  }
}
