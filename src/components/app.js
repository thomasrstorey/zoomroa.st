import { h, render, Component } from 'preact';
import { StyleSheet, css } from 'aphrodite';
import FileDrop from './FileDrop';
import EditorCanvas from './EditorCanvas';
import ImageStore from 'stores/ImageStore';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    flex: '1',
    width: '100%',
    height: '100%',
  }
});

const imageStore = new ImageStore();

class App extends Component {
  render() {
    return (
      <div
        class={css(styles.container)}
      >
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
