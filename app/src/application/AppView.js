import _ from 'underscore';
import Mn from 'backbone.marionette';

import applicationTemplate from './applicationTemplate.hbs';

const AppViewOptions = ['serviceClasses', 'layoutClasses'];

const AppView = Mn.View.extend({
  className: 'Application',
  template: applicationTemplate,
  regions: {
    main: {
      el: '[data-js-region-main]',
      replaceElement: false,
    },
    toaster: {
      el: '[data-js-region-toaster]',
      replaceElement: false,
    },
  },

  initialize(options = {}) {
    this.mergeOptions(options, AppViewOptions);
    this.services = this.initServices(this.getOption('serviceClasses'));
    this.layouts = this.initLayouts(this.getOption('layoutClasses'));
    this.components = this.initComponents(this.getOption('componentClasses'));
  },

  initServices(serviceClasses) {
    return _.reduce(serviceClasses, (out, Service) => {
      const serviceName = Service.prototype.serviceName;
      const service = new Service({
        region: this.getRegion(serviceName),
      });
      return { [serviceName]: service, ...out };
    }, {});
  },

  initLayouts(layoutClasses) {
    return _.reduce(layoutClasses, (out, Layout) => {
      const layoutName = Layout.prototype.layoutName;
      const layout = new Layout({
        region: this.getRegion('main'),
      });
      return { [layoutName]: layout, ...out };
    }, {});
  },

  initComponents(componentClasses) {
    return _.reduce(componentClasses, (out, Component) => {
      const componentName = Component.prototype.componentName;
      const component = new Component();
      return { [componentName]: component, ...out };
    }, {});
  },

  getService(name) {
    return this.services[name];
  },

  getLayout(name) {
    return this.layouts[name];
  },

  onRender() {
    _.each(this.services, (service) => {
      service.show();
    });
  },
});

export default AppView;
