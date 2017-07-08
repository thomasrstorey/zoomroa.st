import Bb from 'backbone';

import ToastModel from './ToastModel';

const ToastCollection = Bb.Collection.extend({
  model(attributes, options = {}) {
    const autoStart = options.collection.autoStart;
    const modelOptions = { ...options, autoStart };
    return new ToastModel(attributes, modelOptions);
  },

  initialize(models, options = {}) {
    this.autoStart = options.autoStart;
  },
});

export default ToastCollection;
