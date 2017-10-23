import _ from 'underscore';
import Radio from 'backbone.radio';
import EditorComponent from '../../../src/components/Editor/EditorComponent';
import EditorView from '../../../src/components/Editor/EditorView';
import EditorModel from '../../../src/components/Editor/EditorModel';

describe('EditorComponent', () => {
  let editorComponent;
  beforeEach(() => {
    editorComponent = new EditorComponent();
  });
  describe('.radioRequests', () => {
    it('has listeners that exist in the component', () => {
      _.each(editorComponent.radioRequests, (method) => {
        expect(editorComponent[method]).to.be.a('function');
      });
    });
  });

  describe('.getEditor', () => {
    it('returns an EditorView, passing in the given options', () => {
      sinon.stub(EditorView.prototype, 'initialize');
      const options = { a: 'test' };
      Radio.channel('component').request('component:editor', options);
      sinon.assert.calledWithMatch(
        EditorView.prototype.initialize, options);
    });
    it('passes the provided attributes and options to the view\'s EditorModel', () => {
      sinon.stub(EditorModel.prototype, 'initialize');
      const modelAttributes = { a: 'test' };
      const modelOptions = { parse: true };
      Radio.channel('component')
        .request('component:editor', null, modelAttributes, modelOptions);
      sinon.assert.calledWithMatch(
        EditorModel.prototype.initialize, modelAttributes, modelOptions);
    });
  });
});
