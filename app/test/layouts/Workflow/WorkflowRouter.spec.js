import _ from 'underscore';
import Mn from 'backbone.marionette';
import WorkflowRouter from '../../../src/layouts/Workflow/WorkflowRouter';

describe('WorkflowRouter', () => {
  describe('initialize', () => {
    it('sets the controller property to a Mn.Object', () => {
      const router = new WorkflowRouter();
      expect(router.controller).to.be.instanceof(Mn.Object);
    });
  });

  describe('.appRoutes', () => {
    it('has routes that match up the methods in .controller', () => {
      const router = new WorkflowRouter();
      _.each(router.appRoutes, (method) => {
        expect(router.controller[method]).to.be.a('function');
      });
    });
  });
});
