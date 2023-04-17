export default class SectionBase {
  constructor(renderer) {
    this._renderer = renderer;
  }

  renderItem(item) {

    this._renderer(item);
  }
}
