import _ from 'underscore';
import Bb from 'backbone';
import ToastView from '../../../src/services/Toaster/ToastView';

describe('ToastView', () => {
  const $fixture = Bb.$('<div id="fixture"></div>');
  let toastView;
  beforeEach(() => {
    Bb.$('body').prepend($fixture);
    const model = new Bb.Model();
    model.dismiss = sinon.spy();
    toastView = new ToastView({ el: $fixture, model });
  });
  afterEach(() => {
    toastView.destroy();
    $fixture.empty();
    Bb.$('body').remove('#fixture');
  });

  describe('.ui', () => {
    it('has elements that exist in the template', () => {
      toastView.once('render', () => {
        _.each(toastView.ui, (ui) => {
          expect(ui.length).to.be.greaterThan(0);
        });
      });
      toastView.render();
    });
  });

  describe('.events', () => {
    it('has event listeners that exist in the view', () => {
      _.each(toastView.events, (method) => {
        expect(toastView[method]).to.be.a('function');
      });
    });
  });

  describe('.onClickDismiss', () => {
    it('calls view.model.dismiss', () => {
      toastView.triggerMethod('click:dismiss');
      expect(toastView.model.dismiss).to.have.been.called;
    });
  });
});
