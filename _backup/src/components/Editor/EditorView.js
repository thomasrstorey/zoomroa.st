import _ from 'underscore';
import Mn from 'backbone.marionette';

const editorTemplate = require('./editorTemplate.hbs');

const EditorView = Mn.View.extend({
  className: 'Editor',
  template: editorTemplate,
  ui: {
    canvas: '[data-js-ui-canvas]',
    target: '[data-js-ui-target]',
    targetBox: '[data-js-ui-targetbox]',
  },

  events: {
    'dragover @ui.target': 'onTargetDragover',
    'dragleave @ui.target': 'onTargetDragleave',
    'dragenter @ui.target': 'onTargetDragenter',
    'drop @ui.target': 'onTargetDrop',
  },

  onTargetDragover(e) {
    e.preventDefault();
  },

  onTargetDragenter(e) {
    e.preventDefault();
    this.ui.target.addClass('Editor-target--dragover');
    this.ui.targetBox.addClass('Editor-targetBox--dragover');
  },

  onTargetDragleave(e) {
    e.preventDefault();
    this.ui.target.removeClass('Editor-target--dragover');
    this.ui.targetBox.removeClass('Editor-targetBox--dragover');
  },

  onTargetDrop(e) {
    e.preventDefault();
    const dataTransfer = e.originalEvent.dataTransfer;
    if (_.isObject(dataTransfer) && _.isArray(dataTransfer.files)) {
      this.model.trigger('drop', dataTransfer.files[0]);
    }
  },
});

export default EditorView;
