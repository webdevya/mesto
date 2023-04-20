export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItem = (item) => {
    this._renderer(item);
  }

  renderItems = (items) => {
    this.clear();
    items.forEach(item => this.renderItem(item));
  }

  clear = () => {
    this._container.innerHTML = '';
  }

  addItem = (item) => {
    this._container.prepend(item);
  }
}
