import { h, render } from 'preact';

let root;

function init() {
  const App = require('./components/app').default;
  root = render(<App />, document.body, root);
}

if (module.hot) {
  require('preact/devtools');
  module.hot.accept('./components/app', () => requestAnimationFrame(init) );
}

init();
