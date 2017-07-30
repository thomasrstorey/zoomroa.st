import Mn from 'backbone.marionette';
import Radio from 'backbone.radio';

import workflowTemplate from './workflowTemplate.hbs';

const WorkflowView = Mn.View.extend({
  template: workflowTemplate,

  regions: {
    settings: {
      el: '[data-js-region-settings]',
      replaceElement: true,
    },
    editor: {
      el: '[data-js-region-editor]',
      replaceElement: true,
    },
    help: {
      el: '[data-js-region-help]',
      replaceElement: true,
    },
  },

  onRender() {
    const channel = Radio.channel('component');
    const editor = channel.request('component:editor');
    this.showChildView('editor', editor);
  },
});

export default WorkflowView;
