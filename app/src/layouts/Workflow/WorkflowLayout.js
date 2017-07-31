import Mn from 'backbone.marionette';

import WorkflowRouter from './WorkflowRouter';

const WorkflowLayoutOptions = ['region'];

const WorkflowLayout = Mn.Object.extend({
  layoutName: 'workflow',

  initialize(options = {}) {
    this.mergeOptions(options, WorkflowLayoutOptions);
    this.router = new WorkflowRouter({ ...options, region: this.region });
  },
});

export default WorkflowLayout;
