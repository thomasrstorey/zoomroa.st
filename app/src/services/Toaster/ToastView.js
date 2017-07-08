import Mn from 'backbone.marionette';

const toastTemplate = require('./toastTemplate.hbs');

const ToastView = Mn.View.extend({
  template: toastTemplate,

  ui: {
    dismiss: '[data-js-ui-button-dismiss]',
  },

  events: {
    'click @ui.dismiss': 'onClickDismiss',
  },

  onClickDismiss() {
    this.model.dismiss();
  },
});

export default ToastView;
