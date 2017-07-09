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
    'dragover @ui.target': 'onTargetDragOver',
    'dragleave @ui.target': 'onTargetDragLeave',
    'dragenter @ui.target': 'onTargetDragEnter',
    'drop @ui.target': 'onTargetDrop',
  },

  onTargetDragOver(e) {
    e.preventDefault();
  },

  onTargetDragEnter(e) {
    e.preventDefault();
    this.ui.target.addClass('Editor-target--dragover');
    this.ui.targetBox.addClass('Editor-targetBox--dragover');
  },

  onTargetDragLeave(e) {
    e.preventDefault();
    this.ui.target.removeClass('Editor-target--dragover');
    this.ui.targetBox.removeClass('Editor-targetBox--dragover');
  },

  onTargetDrop(e) {
    e.preventDefault();
    const dataTransfer = e.originalEvent.dataTransfer;
    if (_.isObject(dataTransfer) && _.isArray(dataTransfer.files)) {
      this.model.trigger('drop', e.dataTransfer.files[0]);
    }
  },
});

export default EditorView;
