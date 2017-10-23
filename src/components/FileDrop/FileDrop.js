import { h, Component } from 'preact';
import { StyleSheet, css } from 'aphrodite';
import { observer } from 'mobx-react';
import _ from 'lodash';

const styles = StyleSheet.create({
  area: {
    backgroundColor: '#fff',
    border: 'dashed 5px #777',
    boxSizing: 'border-box',
    color: '#777',
    height: '100%',
    left: '0',
    opacity: '0',
    position: 'absolute',
    top: '0',
    width: '100%',
    zIndex: '0',
  },
  areaDragover: {
    opacity: '0.5',
  },
});

@observer class FileDrop extends Component {
  state = {
    dragover: false,
  };

  render() {
    const { dragover } = this.state;
    const classes = [styles.area];
    if (dragover) {
      classes.push(styles.areaDragover);
    }
    return (
      <div
        class={css(...classes)}
        ondrop={this.onDrop.bind(this)}
        ondragover={this.onDragOver.bind(this)}
        ondragleave={this.onDragLeave.bind(this)}
        ref={(el) => { this.el = el; }}
      >
        <span>Drop image anywhere.</span>
      </div>
    );
  }

  onDrop(event) {
    event.preventDefault();
    this.setState({ dragover: false });
    const dataTransfer = event.dataTransfer;
    if (dataTransfer.items) {
      _.each(dataTransfer.items, (item) => {
        if (item.kind === 'file' && this.props.accept.includes(item.type)) {
          this.props.store.addFile(item.getAsFile());
        } else {
          // show some kind of error
          // "It looks like you tried to use a file of an incompatible type."
        }
      });
    }
  }

  onDragOver(event) {
    event.preventDefault();
    this.setState({ dragover: true });
  }

  onDragLeave(event) {
    this.setState({ dragover: false });
  }
}

export default FileDrop;
