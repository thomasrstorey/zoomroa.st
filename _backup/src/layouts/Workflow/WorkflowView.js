import Mn from 'backbone.marionette';
import Radio from 'backbone.radio';

import workflowTemplate from './workflowTemplate.hbs';

const WorkflowView = Mn.View.extend({
  className: 'Workflow',
  template: workflowTemplate,

  regions: {
    sidebarRight: {
      el: '[data-js-region-sidebar-right]',
      replaceElement: true,
    },
    workspace: {
      el: '[data-js-region-workspace]',
      replaceElement: true,
    },
    sidebarLeft: {
      el: '[data-js-region-sidebar-left]',
      replaceElement: true,
    },
  },

  onRender() {
    const channel = Radio.channel('component');
    const editor = channel.request('component:editor');
    this.showChildView('workspace', editor);
  },
});

export default WorkflowView;
