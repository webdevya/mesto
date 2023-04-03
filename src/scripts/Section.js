export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this.renderItem = this.renderItem.bind(this);
  }

  renderItems() {
    this.clear();
    this._items.forEach(item => this._renderer(item));
  }

  renderItem(item) {
    this._renderer(item);
  }

  clear() {
    this._container.innerHTML = '';
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
