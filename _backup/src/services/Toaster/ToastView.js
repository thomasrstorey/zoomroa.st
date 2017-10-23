import Mn from 'backbone.marionette';

import toastTemplate from './toastTemplate.hbs';

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
