import Mn from 'backbone.marionette';

import ToastView from './ToastView';

const ToastCollectionView = Mn.CollectionView.extend({
  childView: ToastView,
});

export default ToastCollectionView;
