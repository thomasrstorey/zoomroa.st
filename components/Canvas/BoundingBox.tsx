import React from 'react';
import { Group, Rect } from 'react-konva';

interface IProps {
  x: number;
  y: number;
  height: number;
  width: number;
  scale: number;
}

class BoundingBox extends React.Component<IProps> {

  public render() {
    const { x, y, height, width, scale } = this.props;
    return (
      <Group x={x} y={y}>
        <Rect
          x={2}
          y={2}
          width={width - 4}
          height={height - 4}
          stroke="black"
          strokeEnabled={true}
          strokeWidth={Math.max(2, Math.floor(2 / scale))}
        />
        <Rect
          x={-2}
          y={-2}
          width={width + 4}
          height={height + 4}
          stroke="black"
          strokeEnabled={true}
          strokeWidth={Math.max(2, Math.floor(2 / scale))}
          onMouseOver={this.onRectMouseOver}
          onMouseOut={this.onRectMouseOut}
          onMouseDown={this.onRectMouseDown}
          onMouseUp={this.onRectMouseUp}
        />
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          stroke="white"
          strokeEnabled={true}
          strokeWidth={Math.max(2, Math.floor(2 / scale))}
        />
      </Group>
    );
  }

  private onRectMouseOver = () => {
    document.body.style.cursor = 'grab';
  };

  private onRectMouseOut = () => {
    document.body.style.cursor = 'default';
  };

  private onRectMouseDown = () => {
    document.body.style.cursor = 'grabbing';
  };

  private onRectMouseUp = () => {
    document.body.style.cursor = 'grab';
  };
}

export default BoundingBox;
