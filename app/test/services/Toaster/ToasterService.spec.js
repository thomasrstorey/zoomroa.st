import _ from 'underscore';
import Bb from 'backbone';
import Mn from 'backbone.marionette';
import Radio from 'backbone.radio';
import ToasterService from '../../../src/services/Toaster/ToasterService';

describe('ToasterService', () => {
  let toasterService;
  let show;
  beforeEach(() => {
    show = sinon.spy();
    toasterService = new ToasterService({ region: { show } });
  });

  describe('.initialize', () => {
    it('sets the collection property to a Bb.Collection', () => {
      expect(toasterService.collection).to.be.instanceof(Bb.Collection);
    });
    it('sets the view property to a Mn.CollectionView', () => {
      expect(toasterService.view).to.be.instanceof(Mn.CollectionView);
    });
  });

  describe('.radioEvents', () => {
    it('has event listeners that exist on the service', () => {
      _.each(toasterService.radioEvents, (method) => {
        expect(toasterService[method]).to.be.a('function');
      });
    });
  });

  describe('.show', () => {
    it('calls the service.region.show with service.view', () => {
      toasterService.show();
      expect(show).to.have.been.calledWith(toasterService.view);
    });
  });

  describe('onToast', () => {
    beforeEach(() => {
      Radio.channel('toaster').trigger('toast', 'test', 'test');
    });
    it('adds a toast model to service.collection', () => {
      expect(toasterService.collection.length).to.equal(1);
    });
    it('passes the flavor and message to the new Toast model', () => {
      expect(toasterService.collection.at(0).get('flavor')).to.equal('test');
      expect(toasterService.collection.at(0).get('message')).to.equal('test');
    });
  });

  describe('onClean', () => {
    it('empties service.collection', () => {
      Radio.channel('toaster').trigger('toast', 'test', 'test');
      expect(toasterService.collection.length).to.equal(1);
      Radio.channel('toaster').trigger('clean');
      expect(toasterService.collection.length).to.equal(0);
    });
  });
});
