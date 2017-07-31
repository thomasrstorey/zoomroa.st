import Mn from 'backbone.marionette';
import WorkflowLayout from '../../../src/layouts/Workflow/WorkflowLayout';

describe('WorkflowLayout', () => {
  describe('.initialize', () => {
    it('initializes and sets the router property to an AppRouter', () => {
      const workflowLayout = new WorkflowLayout();
      expect(workflowLayout.router).to.be.instanceof(Mn.AppRouter);
    });
  });
});
