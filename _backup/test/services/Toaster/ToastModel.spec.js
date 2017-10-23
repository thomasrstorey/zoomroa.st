import ToastModel from '../../../src/services/Toaster/ToastModel';

describe('ToastModel', () => {
  let toastModel;
  beforeEach(() => {
    toastModel = new ToastModel();
  });

  describe('.initialize', () => {
    beforeEach(() => {
      sinon.stub(ToastModel.prototype, 'start');
    });
    afterEach(() => {
      ToastModel.prototype.start.restore();
    });
    it('does not call start immediately by default', () => {
      toastModel = new ToastModel();
      expect(toastModel.start).to.have.not.been.called;
    });
    it('calls start immediately if the autoStart option is passed in', () => {
      toastModel = new ToastModel({}, { autoStart: true });
      expect(toastModel.start).to.have.been.called;
    });
  });

  describe('.start', () => {
    it('calls model.dismiss after model.attributes.ttl seconds', (done) => {
      toastModel.dismiss = sinon.spy();
      toastModel.set('ttl', 1);
      toastModel.start();
      window.setTimeout(() => {
        expect(toastModel.dismiss).to.have.not.been.called;
        done();
      }, 999);
      window.setTimeout(() => {
        expect(toastModel.dismiss).to.have.been.called;
        done();
      }, 1001);
    });
  });

  describe('.dismiss', () => {
    it('removes itself from its collection', () => {
      toastModel.collection = { remove: sinon.spy() };
      toastModel.dismiss();
      expect(toastModel.collection.remove).to.have.been.calledWith(toastModel);
    });
  });

  describe('.stop', () => {
    it('prevents a started model from calling dismiss', (done) => {
      toastModel.dismiss = sinon.spy();
      toastModel.set('ttl', 1);
      toastModel.start();
      toastModel.stop();
      window.setTimeout(() => {
        expect(toastModel.dismiss).to.have.not.been.called;
        done();
      }, 1001);
    });
  });
});
