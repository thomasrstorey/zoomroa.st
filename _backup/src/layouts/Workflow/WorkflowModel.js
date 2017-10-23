import Bb from 'backbone';

const WorkflowModel = Bb.Model.extend({
  defaults: {
    step: 1,
  },
});

export default WorkflowModel;
