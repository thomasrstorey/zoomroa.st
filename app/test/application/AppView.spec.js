import Bb from 'backbone';
import AppView from '../../src/application/AppView';

describe('AppView', () => {
  const $fixture = Bb.$('<div id="fixture"></div>');
  let appView;
  beforeEach(() => {
    Bb.$('body').prepend($fixture);
    appView = new AppView({
      el: $fixture,
    });
  });

  afterEach(() => {
    appView.destroy();
    $fixture.empty();
    Bb.$('body').remove('#fixture');
  });

  describe('.initialize', () => {
    it('initializes the Application\'s layouts', () => {
      expect(appView.layouts).to.be.an('object');
    });
    it('initializes the Application\'s services', () => {
      expect(appView.services).to.be.an('object');
    });
    it('initializes the Application\'s components', () => {
      expect(appView.components).to.be.an('object');
    });
  });

  describe('.regions', () => {
    beforeEach(() => {
      sinon.stub(appView, 'onRender');
    });
    afterEach(() => {
      appView.onRender.restore();
    });
    it('defines an main region which exists in the DOM', () => {
      appView.once('render', () => {
        const editorRegionEl = appView.$el.find(
          appView.getRegion('main').el);
        expect(editorRegionEl.length).to.equal(1);
      });
      appView.render();
    });
    it('defines a toaster region which exists in the DOM', () => {
      appView.once('render', () => {
        const toasterRegionEl = appView.$el.find(
          appView.getRegion('toaster').el);
        expect(toasterRegionEl.length).to.equal(1);
      });
      appView.render();
    });
  });

  describe('.initLayouts', () => {
    it('given an Array of LayoutClasses, initializes them and returns them',
      () => {
        const spy = sinon.spy();
        const out = appView.initLayouts([spy, spy, spy]);
        expect(spy.calledThrice).to.equal(true);
        expect(out.undefined).to.be.an('object');
      });
  });

  describe('.initServices', () => {
    it('given an Array of ServiceClasses, initializes them and returns them',
      () => {
        const spy = sinon.spy();
        const out = appView.initServices([spy, spy, spy]);
        expect(spy.calledThrice).to.equal(true);
        expect(out.undefined).to.be.an('object');
      });
  });

  describe('.initComponents', () => {
    it('given an Array of ComponentClasses, initializes them and returns them',
      () => {
        const spy = sinon.spy();
        const out = appView.initComponents([spy, spy, spy]);
        expect(spy.calledThrice).to.equal(true);
        expect(out.undefined).to.be.an('object');
      });
  });

  describe('.onRender', () => {
    it('calls the show method on each registered Service',
      () => {
        const show = sinon.spy();
        function service() {
          this.show = show;
        }
        appView = new AppView({ serviceClasses: [service] });
        appView.once('render', () => {
          expect(show.calledOnce).to.equal(true);
        });
        appView.render();
      });
  });
});
