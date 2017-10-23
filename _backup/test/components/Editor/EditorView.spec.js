import _ from 'underscore';
import Bb from 'backbone';
import EditorView from '../../../src/components/Editor/EditorView';

describe('EditorView', () => {
  const $fixture = Bb.$('<div id="fixture"></div>');
  let editorView;
  beforeEach(() => {
    Bb.$('body').prepend($fixture);
    editorView = new EditorView({ el: $fixture });
  });
  afterEach(() => {
    editorView.destroy();
  });

  describe('.ui', () => {
    it('defines ui elements that exist in the template', () => {
      editorView.once('render', () => {
        _.each(editorView.ui, (ui) => {
          expect(ui.length).to.be.greaterThan(0);
        });
      });
      editorView.render();
    });
  });

  describe('.events', () => {
    it('defines listeners that exist in the view', () => {
      _.each(editorView.events, (method) => {
        expect(editorView[method]).to.be.a('function');
      });
    });
  });

  describe('.onTargetDragEnter', () => {
    it('adds the Editor-target(Box)--dragover classes', () => {
      editorView.once('render', () => {
        editorView.triggerMethod('target:dragenter', new Bb.$.Event());
        expect(editorView.ui.target.hasClass('Editor-target--dragover'))
          .to.equal(true);
        expect(editorView.ui.targetBox.hasClass('Editor-targetBox--dragover'))
          .to.equal(true);
      });
      editorView.render();
    });
  });

  describe('.onTargetDragLeave', () => {
    it('removes the Editor-target(Box)--dragover classes', () => {
      editorView.once('render', () => {
        editorView.triggerMethod('target:dragenter', new Bb.$.Event());
        editorView.triggerMethod('target:dragleave', new Bb.$.Event());
        expect(editorView.ui.target.hasClass('Editor-target--dragover'))
          .to.equal(false);
        expect(editorView.ui.targetBox.hasClass('Editor-targetBox--dragover'))
          .to.equal(false);
      });
      editorView.render();
    });
  });

  describe('.onTargetDrop', () => {
    it('triggers the drop event on view.model with the dropped files', () => {
      const file = { test: 'test' };
      const eventMock = {
        preventDefault: sinon.spy(),
        originalEvent: {
          dataTransfer: { files: [file] },
        },
      };
      const model = new Bb.Model();
      const modelMock = sinon.mock(model);
      modelMock.expects('trigger').withArgs('drop', file);

      editorView = new EditorView({
        el: $fixture,
        model: model,
      });
      editorView.triggerMethod('target:drop', eventMock);
      expect(modelMock.verify()).to.equal(true);
    });
  });
});
