export default class Section {
  constructor({ itemsPromise, renderer }, containerSelector) {
    this._itemsPromise = itemsPromise;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems = () => {
    this.clear();
    //this._items.forEach(item => this._renderer(item));
    this._itemsPromise.then(items => { items.forEach(item => this._renderer(item)); console.log(items); })

  }

  renderItem = (item) => {
    this._renderer(item);
  }

  clear = () => {
    this._container.innerHTML = '';
  }

  addItem = (item) => {
    this._container.prepend(item);
  }
}
