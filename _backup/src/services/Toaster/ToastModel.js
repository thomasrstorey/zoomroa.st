import _ from 'underscore';
import Bb from 'backbone';

const ToastModel = Bb.Model.extend({
  defaults: {
    message: '',
    flavor: 'default',
    alive: true,
    ttl: 10,
    timeoutID: null,
    dismissable: true,
  },

  initialize(attributes, options = {}) {
    if (options.autoStart === true) {
      this.start();
    }
  },

  start() {
    this.set(
      'timeoutID',
      window.setTimeout(() => {
        this.unset('timeoutID');
        this.dismiss();
      }, this.get('ttl') * 1000));
  },

  dismiss() {
    this.set('alive', false);
    this.stop();
    if (!_.isUndefined(this.collection)) {
      this.collection.remove(this);
    }
  },

  stop() {
    if (this.has('timeoutID') && _.isNumber(this.get('timeoutID'))) {
      window.clearTimeout(this.get('timeoutID'));
    }
  },
});

export default ToastModel;
