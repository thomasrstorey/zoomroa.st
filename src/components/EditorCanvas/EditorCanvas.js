import { h, Component } from 'preact';
import { StyleSheet, css } from 'aphrodite';
import { observer } from 'mobx-react';
import _ from 'lodash';

const styles = StyleSheet.create({
  canvas: {
    height: '600px',
    width: '800px',
    zIndex: 1,
  },
});

@observer class EditorCanvas extends Component {
  render() {
    const selected = this.props.store.selected;
    if (selected === undefined || !selected.loaded) {
      return null;
    }
    return (
      <canvas
        class={css(styles.canvas)}
        width={selected.image.width}
        height={selected.image.height}
        ref={(el) => { this.el = el; }}
      />
    );
  }

  componentWillUpdate() {
    if (this.el) {
      this.el.removeEventListener('mousedown', this.onMouseDown.bind(this));
      this.el.removeEventListener('mousemove', this.onMouseMove.bind(this));
      this.el.removeEventListener('mouseup', this.onMouseUp.bind(this));
    }
  }

  componentDidUpdate() {
    if (this.el) {
      this.el.addEventListener('mousedown', this.onMouseDown.bind(this));
      this.el.addEventListener('mousemove', this.onMouseMove.bind(this));
      this.el.addEventListener('mouseup', this.onMouseUp.bind(this));
      this.context = this.el.getContext('2d');
      const svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
      this.xform = svg.createSVGMatrix();
      this.point = svg.createSVGPoint();
      this.draw();
    }
  }

  onMouseDown(event) {
    if(this.el) {
      this.origin = {
        x: event.offsetX || event.pageX - this.el.offsetLeft,
        y: event.offsetY || event.pageY - this.el.offsetTop,
      };
      this.dragging = true;
    }
  }

  onMouseMove(event) {
    if (this.el && this.dragging) {
      const drag = {
        x: event.offsetX || event.pageX - this.el.offsetLeft,
        y: event.offsetY || event.pageY - this.el.offsetTop,
      };
      this.point.x = drag.x;
      this.point.y = drag.y;
      this.point.matrixTransform(this.xform.inverse());
      const dx = this.point.x - this.origin.x;
      const dy = this.point.y - this.origin.y
      this.xform.translate(dx, dy);
      this.context.translate(dx, dy);
      this.clear();
      this.draw();
      this.origin = drag;
    }
  }

  onMouseUp(event) {
    this.dragging = false;
    this.origin = null;
  }

  clear() {
    this.context.save();
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.clearRect(0, 0, this.el.width, this.el.height);
    this.context.restore();
  }

  draw() {
    this.context.drawImage(this.props.store.selected.image, 0, 0);
  }
}

export default EditorCanvas;
