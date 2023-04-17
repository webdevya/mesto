import SectionBase from "./SectionBase";

export default class Section extends SectionBase {
  constructor({ items, renderer }, containerSelector) {
    super(renderer);
    this._items = items;
    this._container = document.querySelector(containerSelector);
  }

  renderItems = () => {
    this.clear();
    this._items.then(items => { items.forEach(item => super.renderItem(item)); })
  }

  clear = () => {
    this._container.innerHTML = '';
  }

  addItem = (item) => {
    this._container.prepend(item);
  }
}
