import ToastCollection from '../../../src/services/Toaster/ToastCollection';
import ToastModel from '../../../src/services/Toaster/ToastModel';

describe('ToastCollection', () => {
  describe('.model', () => {
    it('returns a preconfigured ToastModel', () => {
      sinon.spy(ToastModel.prototype, 'initialize');
      const toastCollection = new ToastCollection([], { autoStart: true });
      toastCollection.add({});
      expect(ToastModel.prototype.initialize.firstCall.args[1].autoStart)
        .to.equal(true);
      ToastModel.prototype.initialize.restore();
    });
  });

  describe('.initialize', () => {
    it('sets collection.autoStart according to the given options', () => {
      let toastCollection = new ToastCollection([], { autoStart: true });
      expect(toastCollection.autoStart).to.equal(true);

      toastCollection = new ToastCollection([], { autoStart: false });
      expect(toastCollection.autoStart).to.equal(false);
    });
  });
});
