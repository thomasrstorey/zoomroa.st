import WorkflowModel from '../../../src/layouts/Workflow/WorkflowModel';

describe('WorkflowModel', () => {
  describe('.defaults', () => {
    it('has a step property equal to 1', () => {
      const workflowModel = new WorkflowModel();
      expect(workflowModel.get('step')).to.equal(1);
    });
  });
});
