export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this.container = document.querySelector(containerSelector);
    }

addItem(element) {
    //метод принимает ДОМ-эл-нт и добавляет его в контейнер
    this.container.prepend(element);
}

//ф-ия отрисовки начальных карточек
renderItems() {
    //отрисовка каждого отдельного эл-та
    this._items.forEach((item) => {
        this._renderer(item)
    });
}
}

