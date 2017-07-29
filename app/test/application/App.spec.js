import Bb from 'backbone';
import Mn from 'backbone.marionette';

import App from '../../src/application/App';
import index from '../../src/index.html';

let app = null;
function getBodyContent(html) {
  const indexStart = html.indexOf('<body>') + 6;
  const indexEnd = html.indexOf('</body>');
  const bodyContent = html.substring(indexStart, indexEnd);

  return bodyContent;
}

const fixture = getBodyContent(index);

beforeEach(() => {
  document.body.insertAdjacentHTML('afterbegin', fixture);
  app = new App();
});

afterEach(() => {
  document.body.removeChild(document.getElementById('zoomroast'));
});

describe('App', () => {
  describe('.region', () => {
    it('defines the app region uniquely', () => {
      const region = app.getRegion();
      expect(region.$el.length).to.equal(1);
    });
  });
  describe('.onStart', () => {
    beforeEach(() => {
      app.start();
    });
    it('starts Backbone.history', () => {
      expect(Bb.History.started).to.equal(true);
    });
    it('shows a view in the region', () => {
      const region = app.getRegion();
      expect(region.currentView).to.be.instanceof(Mn.View);
    });
  });
});
