import Mn from 'backbone.marionette';

import AppView from './AppView';

const App = Mn.Application.extend({
  region: {
    el: '[data-js-region-app]',
    replaceElement: true,
  },

  onStart() {
    const appView = new AppView();
    this.showView(appView);
  },
});

export default App;
