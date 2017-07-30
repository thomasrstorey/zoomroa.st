import Mn from 'backbone.marionette';

import WorkflowView from './WorkflowView';
import WorkflowModel from './WorkflowModel';

const WorkflowControllerOptions = ['region'];

const WorkflowController = Mn.Object.extend({
  initialize(options = {}) {
    this.mergeOptions(options, WorkflowControllerOptions);
  },

  showWorkflow() {
    const model = new WorkflowModel();
    this.region.show(new WorkflowView({ model }));
  },
});

const WorkflowRouter = Mn.AppRouter.extend({
  initialize(options = {}) {
    this.controller = new WorkflowController(options);
  },

  appRoutes: {
    '(/)': 'showWorkflow',
  },
});

export default WorkflowRouter;
