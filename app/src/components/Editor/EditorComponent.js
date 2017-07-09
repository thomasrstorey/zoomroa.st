import Mn from 'backbone.marionette';

import EditorRouter from './EditorRouter';

const EditorComponent = Mn.Object.extend({
  componentName: 'editor',

  region: null,

  Router: EditorRouter,

  initialize(options = {}) {
    this.router = new this.Router({ ...options, region: this.region });
  },
});

export default EditorComponent;
