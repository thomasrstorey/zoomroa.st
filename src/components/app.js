import { h, render, Component } from 'preact';
import FileDrop from './FileDrop';
import EditorCanvas from './EditorCanvas';
import ImageStore from 'stores/ImageStore';

const imageStore = new ImageStore();

class App extends Component {
  render() {
    return (
      <div>
        <FileDrop
          store={imageStore}
          accept={['image/jpeg', 'image/png', 'image/gif']}
        />
        <EditorCanvas
          store={imageStore}
        />
      </div>
    )
  }
}

export default App;
