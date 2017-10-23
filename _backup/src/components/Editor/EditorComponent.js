import Mn from 'backbone.marionette';

import EditorView from './EditorView';
import EditorModel from './EditorModel';

const EditorComponent = Mn.Object.extend({
  componentName: 'editor',
  channelName: 'component',
  radioRequests: {
    'component:editor': 'getEditor',
  },

  getEditor(options = {}, modelAttributes = {}, modelOptions = {}) {
    const model = new EditorModel({ ...modelAttributes }, { ...modelOptions });
    return new EditorView({ model, ...options });
  },
});

export default EditorComponent;
