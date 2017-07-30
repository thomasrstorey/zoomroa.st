import Bb from 'backbone';
import Mn from 'backbone.marionette';

import Services from '../services';
import Layouts from '../layouts';
import Components from '../components';
import AppView from './AppView';

const App = Mn.Application.extend({
  region: {
    el: '[data-js-region-app]',
    replaceElement: true,
  },

  onStart() {
    const appView = new AppView({
      serviceClasses: Services,
      layoutClasses: Layouts,
      componentClasses: Components,
    });
    this.showView(appView);
    if (!Bb.History.started) {
      Bb.history.start();
    }
  },
});

export default App;
