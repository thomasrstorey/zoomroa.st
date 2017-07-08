import Mn from 'backbone.marionette';

const editorTemplate = require('./editorTemplate.hbs');

const EditorView = Mn.View.extend({
  template: editorTemplate,
  ui: {
    canvas: '[data-js-ui-canvas]',
    target: '[data-js-ui-target]'
  },

  events: {
    'dragover @ui.target': 'onTargetDragOver',
    'dragexit @ui.target': 'onTargetDragExit',
    'dragenter @ui.target': 'onTargetDragEnter',
    'drop @ui.target': 'onTargetDrop',
  },

  onTargetDragOver(e) {
    e.preventDefault();
  },

  onTargetDragEnter(e) {
    e.preventDefault();
    this.ui.target.addClass('Editor-target--dragover');
  },

  onTargetDragExit(e) {
    e.preventDefault();
    this.ui.target.removeClass('Editor-target--dragover');
  },

  onTargetDrop(e) {
    e.preventDefault();
    if (_.isObject(e.dataTransfer) && _.isArray(e.dataTransfer.files)){
      this.model.trigger('drop', e.dataTransfer.files[0]);
    }
  },
});

export default EditorView;
