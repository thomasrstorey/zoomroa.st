import { observable, computed } from 'mobx';
import _ from 'lodash';
import EditorImage from 'models/EditorImage';

class ImageStore {
  @observable images = [];

  addFile(file) {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      this.images.push(
        new EditorImage(
          this,
          _.uniqueId('image_'), {
            name: file.name,
            type: file.type,
            selected: true,
            base64url: event.target.result,
          }
        ));
    };
    fileReader.readAsDataURL(file);
  }

  @computed get selected() {
    return this.images.find(item => item.selected);
  }

  toJS() {
    return this.images.map(image => image.toJS());
  }

  static fromJS(array) {
    const imageStore = new ImageStore();
    imageStore.images = array.map(item => EditorImage.fromJS(imageStore, item));
    return imageStore;
  }
}

export default ImageStore;
