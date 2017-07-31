import Bb from 'backbone';

import WorkflowView from '../../../src/layouts/Workflow/WorkflowView';

describe('WorkflowView', () => {
  const $fixture = Bb.$('<div id="fixture"></div>');
  let workflowView;
  beforeEach(() => {
    Bb.$('body').prepend($fixture);
    workflowView = new WorkflowView({
      el: $fixture,
    });
  });

  afterEach(() => {
    workflowView.destroy();
    $fixture.empty();
    Bb.$('body').remove('#fixture');
  });

  describe('.regions', () => {
    beforeEach(() => {
      sinon.stub(workflowView, 'onRender');
    });
    afterEach(() => {
      workflowView.onRender.restore();
    });
    it('uniquely defines a sidebarRight region', () => {
      workflowView.once('render', () => {
        const $sidebarRightRegionEl = workflowView.$el.find(
          workflowView.getRegion('sidebarRight').el);
        expect($sidebarRightRegionEl.length).to.equal(1);
      });
      workflowView.render();
    });
    it('uniquely defines a workspace region', () => {
      workflowView.once('render', () => {
        const $workspaceRegionEl = workflowView.$el.find(
          workflowView.getRegion('workspace').el);
        expect($workspaceRegionEl.length).to.equal(1);
      });
      workflowView.render();
    });
    it('uniquely defines a sidebarLeft region', () => {
      workflowView.once('render', () => {
        const $sidebarLeftRegionEl = workflowView.$el.find(
          workflowView.getRegion('sidebarLeft').el);
        expect($sidebarLeftRegionEl.length).to.equal(1);
      });
      workflowView.render();
    });
  });

  describe('.onRender', () => {
    it('shows a child view in the workspace region', () => {
      workflowView.once('render', () => {
        expect(workflowView.getRegion('workspace').$el.length).to.equal(1);
      });
      workflowView.render();
    });
  });
});
