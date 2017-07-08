import Mn from 'backbone.marionette';
import Radio from 'backbone.radio';

import ToastCollectionView from './ToastCollectionView';
import ToastCollection from './ToastCollection';

const ToasterService = Mn.Object.extend({
  initialize(options = {}) {
    this.region = options.region;
    this.collection = new ToastCollection();
    this.channel = Radio.channel('toaster');
    this.view = new ToastCollectionView({ collection: this.collection });
    this.region.show(this.view);
  },

  channelName: 'toaster',

  radioEvents: {
    toast: 'onToast',
    clean: 'onClean',
  },

  onToast(flavor, message, options = {}) {
    this.collection.add({
      flavor,
      message,
      ttl: 10,
      ...options,
    });
  },

  onClean() {
    this.collection.reset();
  },
});

export default ToasterService;
