import Mn from 'backbone.marionette';
import Radio from 'backbone.radio';

import ToastCollectionView from './ToastCollectionView';
import ToastCollection from './ToastCollection';

const ToasterServiceOptions = ['region'];

const ToasterService = Mn.Object.extend({
  initialize(options = {}) {
    this.mergeOptions(options, ToasterServiceOptions);
    this.collection = new ToastCollection();
    this.channel = Radio.channel('toaster');
    this.view = new ToastCollectionView({ collection: this.collection });
  },

  serviceName: 'toaster',

  channelName: 'toaster',

  radioEvents: {
    toast: 'onToast',
    clean: 'onClean',
  },

  show() {
    this.region.show(this.view);
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
