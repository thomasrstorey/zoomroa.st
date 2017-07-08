import Mn from 'backbone.marionette';

import EditorModel from './EditorModel';
import EditorView from './EditorView';

const EditorController = Mn.Object.extend({
  initialize(options = {}) {
    this.region = options.region;
  },

  showEditor() {
    const model = new EditorModel();
    this.region.show(new EditorView({ model }));
  },
});

const EditorRouter = Mn.AppRouter.extend({
  initialize(options = {}) {
    this.controller = new EditorController(options);
  },

  appRoutes: {
    '(/)': 'showEditor',
  },
});

export default EditorRouter;
