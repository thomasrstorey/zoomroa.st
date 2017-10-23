import { observable } from 'mobx';

class EditorImage {
  store;
  id;

  @observable name;
  @observable type;
  @observable base64url;
  @observable image;
  @observable selected = false;
  @observable loaded = false;

  constructor(store, id, { name, type, base64url, selected }) {
    this.image = new Image();
    this.image.src = base64url;
    this.image.onload = () => { this.loaded = true; };
    this.store = store;
    this.id = id;
    this.name = name;
    this.type = type;
    this.selected = selected;
  }

  select() {
    this.selected = true;
  }

  unselect() {
    this.selected = false;
  }

  destroy() {
    this.store.images.remove(this);
  }

  toJS() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      base64String: this.base64url,
    };
  }

  static fromJS(store, {id, name, type, base64url}) {
    return new EditorImage(store, id, { name, type, image });
  }
}

export default EditorImage;
