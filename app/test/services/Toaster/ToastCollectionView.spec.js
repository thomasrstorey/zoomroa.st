import ToastCollectionView from '../../../src/services/Toaster/ToastCollectionView';
import ToastView from '../../../src/services/Toaster/ToastView';

describe('ToastCollectionView', () => {
  describe('.childView', () => {
    it('returns a ToastView when called as a constructor', () => {
      const collectionView = new ToastCollectionView();
      const view = new collectionView.childView();
      expect(view).to.be.instanceof(ToastView);
    });
  });
});
