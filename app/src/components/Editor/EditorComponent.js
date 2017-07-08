import Mn from 'backbone.marionette';

import EditorRouter from './EditorRouter';

const EditorComponent = Mn.Object.extend({
  name: 'editor',

  region: Mn.Region,

  Router: EditorRouter,

  initialize(options = {}) {
    this.router = new this.Router(options);
  },
});

export default EditorComponent;
