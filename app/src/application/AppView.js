import Mn from 'backbone.marionette';

const applicationTemplate = require('./applicationTemplate.hbs');

const AppView = Mn.View.extend({
  className: 'Application',
  template: applicationTemplate,
});

export default AppView;
