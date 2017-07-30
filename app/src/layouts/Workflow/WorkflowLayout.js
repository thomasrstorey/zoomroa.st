import Mn from 'backbone.marionette';

import WorkflowRouter from './WorkflowRouter';

const WorkflowLayoutOptions = ['region'];

const WorkflowLayout = Mn.Object.extend({
  layoutName: 'workflow',

  Router: WorkflowRouter,

  initialize(options = {}) {
    this.mergeOptions(options, WorkflowLayoutOptions);
    this.router = new this.Router({ ...options, region: this.region });
  },
});

export default WorkflowLayout;
