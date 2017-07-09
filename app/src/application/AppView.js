import _ from 'underscore';
import Mn from 'backbone.marionette';

import Services from '../services';
import Components from '../components';

const applicationTemplate = require('./applicationTemplate.hbs');

const AppView = Mn.View.extend({
  className: 'Application',
  template: applicationTemplate,
  regions: {
    editor: {
      el: '[data-js-region-editor]',
      replaceElement: false,
    },
    toaster: {
      el: '[data-js-region-toaster]',
      replaceElement: false,
    },
  },

  onRender() {
    _.each(Services, (BaseService) => {
      const Service = BaseService.extend({
        region: this.getRegion(BaseService.prototype.serviceName),
      });
      return new Service();
    });
    _.each(Components, (BaseComponent) => {
      if (this.hasRegion(BaseComponent.prototype.componentName)) {
        const Component = BaseComponent.extend({
          region: this.getRegion(BaseComponent.prototype.componentName),
        });
        return new Component();
      }
      return null;
    });
  },
});

export default AppView;
