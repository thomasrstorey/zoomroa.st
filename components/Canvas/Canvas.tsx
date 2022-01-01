import Konva from 'konva';
import type { Vector2d } from 'konva/lib/types';
import React from 'react';
import { Group, Image as CanvasImage, Layer, Stage } from 'react-konva';

import BoundingBox from './BoundingBox';
import Handle from './Handle';

export interface ISelection {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface IProps {
  image: HTMLImageElement;
  onSelectionUpdate: (selection: ISelection) => void;
  canvasWidth?: number;
  canvasHeight?: number;
  selectWidth?: number;
  selectHeight?: number;
  anchorSize?: number;
}

interface IState {
  selectPos: Vector2d;
  selectHeight: number;
  selectWidth: number;
  scale: number;
}

const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 600;
const SELECT_START_WIDTH = 200;
const SELECT_START_HEIGHT = 200;


class Canvas extends React.Component<IProps, IState> {
  private stageRef: React.RefObject<Konva.Stage> = React.createRef();
  private layerRef: React.RefObject<Konva.Layer> = React.createRef();
  private groupRef: React.RefObject<Konva.Group> = React.createRef();
  private imageRef: React.RefObject<Konva.Image> = React.createRef();

  public state: IState = {
    selectPos: { x: 0, y: 0 },
    selectHeight: SELECT_START_HEIGHT,
    selectWidth: SELECT_START_WIDTH,
    scale: 1.0,
  };

  public componentDidMount() {
    const {
      image,
      canvasWidth = CANVAS_WIDTH,
      canvasHeight = CANVAS_HEIGHT,
      selectWidth = SELECT_START_WIDTH,
      selectHeight = SELECT_START_HEIGHT,
    } = this.props;
    let scaleFactor = 1.0;
    if (image.width > image.height && image.width > canvasWidth) {
      scaleFactor = canvasWidth / image.width;
    } else if (image.height > image.width && image.height > canvasHeight) {
      scaleFactor = canvasHeight / image.height;
    }
    const centerX = (-image.width / 2) * scaleFactor + canvasWidth / 2;
    const centerY = (-image.height / 2) * scaleFactor + canvasHeight / 2;
    const stage = this.stageRef.current;
    const group = this.groupRef.current;
    if (!group || !stage) {
      return;
    }
    stage.scale({ x: scaleFactor, y: scaleFactor });
    stage.position({ x: centerX, y: centerY });
    group.position({
      x: image.width / 2 - selectWidth / 2,
      y: image.height / 2 - selectHeight / 2,
    });
    this.props.onSelectionUpdate({
      height: selectHeight,
      width: selectWidth,
      x: group.x(),
      y: group.y(),
    });
    this.setState({
      selectHeight: selectHeight,
      selectWidth: selectWidth,
      scale: stage.scale().x,
    });
    if (this.layerRef.current) {
      this.layerRef.current.batchDraw();
    }
  }

  public render() {
    const {
      image,
      canvasWidth = CANVAS_WIDTH,
      canvasHeight = CANVAS_HEIGHT,
    } = this.props;
    const { selectPos, selectHeight, selectWidth, scale } = this.state;
    return (
      <Stage
        width={canvasWidth}
        height={canvasHeight}
        draggable={true}
        onWheel={this.onWheel}
        ref={this.stageRef}
      >
        <Layer ref={this.layerRef}>
          <CanvasImage image={image} ref={this.imageRef} />
          <Group
            x={0}
            y={0}
            height={selectHeight}
            width={selectWidth}
            ref={this.groupRef}
            draggable={true}
            onDragMove={this.groupOnDragMove}
          >
            <BoundingBox
              x={selectPos.x}
              y={selectPos.y}
              height={selectHeight}
              width={selectWidth}
              scale={scale}
            />
            <Handle
              x={selectPos.x}
              y={selectPos.y}
              onUpdate={this.onTopLeftHandleUpdate}
              setGroupDraggable={this.setGroupDraggable}
              refreshLayer={this.refreshLayer}
              scale={scale}
            />
            <Handle
              x={selectPos.x + selectWidth}
              y={selectPos.y}
              onUpdate={this.onTopRightHandleUpdate}
              setGroupDraggable={this.setGroupDraggable}
              refreshLayer={this.refreshLayer}
              scale={scale}
            />
            <Handle
              x={selectPos.x + selectWidth}
              y={selectPos.y + selectHeight}
              onUpdate={this.onBottomRightHandleUpdate}
              setGroupDraggable={this.setGroupDraggable}
              refreshLayer={this.refreshLayer}
              scale={scale}
            />
            <Handle
              x={selectPos.x}
              y={selectPos.y + selectHeight}
              onUpdate={this.onBottomLeftHandleUpdate}
              setGroupDraggable={this.setGroupDraggable}
              refreshLayer={this.refreshLayer}
              scale={scale}
            />
          </Group>
        </Layer>
      </Stage>
    );
  }

  private groupOnDragMove = () => {
    const group = this.groupRef.current;
    if (!group) {
      return;
    }
    this.props.onSelectionUpdate({
      height: group.height(),
      width: group.width(),
      x: group.x() + this.state.selectPos.x,
      y: group.y() + this.state.selectPos.y,
    });
  };


  private onTopLeftHandleUpdate = (topLeft: Vector2d) => {
    const bottomRight = this.getBottomRight();
    const height = bottomRight.y - topLeft.y;
    const width = bottomRight.x - topLeft.x;
    this.onHandleUpdate(topLeft, height, width);
  };

  private onTopRightHandleUpdate = (topRight: Vector2d) => {
    const bottomRight = this.getBottomRight();
    const topLeft = this.getTopLeft();
    const height = bottomRight.y - topRight.y;
    const width = topRight.x - topLeft.x;
    this.onHandleUpdate({ x: topLeft.x, y: topRight.y }, height, width);
  };

  private onBottomRightHandleUpdate = (bottomRight: Vector2d) => {
    const topLeft = this.getTopLeft();
    const height = bottomRight.y - topLeft.y;
    const width = bottomRight.x - topLeft.x;
    this.onHandleUpdate(topLeft, height, width);
  };

  private onBottomLeftHandleUpdate = (bottomLeft: Vector2d) => {
    const topLeft = this.getTopLeft();
    const bottomRight = this.getBottomRight();
    const height = bottomLeft.y - topLeft.y;
    const width = bottomRight.x - bottomLeft.x;
    this.onHandleUpdate({ x: bottomLeft.x, y: topLeft.y }, height, width);
  };

  private onHandleUpdate(pos: Vector2d, height: number, width: number) {
    const group = this.groupRef.current;
    if (!group) {
      return;
    }
    this.props.onSelectionUpdate({
      height,
      width,
      x: group.x() + pos.x,
      y: group.y() + pos.y,
    });
    this.setState({
      selectPos: pos,
      selectHeight: height,
      selectWidth: width,
    });
  }

  private onWheel = (event: Konva.KonvaEventObject<WheelEvent>) => {
    event.evt.preventDefault();
    const scaleBy = 1.03;
    const stage = event.target.getStage();
    if (stage === null) {
      return;
    }
    const currentScale = stage.scaleX();
    const newScale = event.evt.deltaY > 0 ? currentScale * scaleBy : currentScale / scaleBy;
    const currentPos = stage.getPointerPosition();
    if (currentPos === null) {
      return;
    }
    const dirVector = {
      x: currentPos.x / currentScale - stage.x() / currentScale,
      y: currentPos.y / currentScale - stage.y() / currentScale,
    };
    const newPos = {
      x: -(dirVector.x - currentPos.x / newScale) * newScale,
      y: -(dirVector.y - currentPos.y / newScale) * newScale,
    };
    stage.scale({ x: newScale, y: newScale });
    stage.position(newPos);
    stage.batchDraw();
    this.setState({ scale: stage.scale().x });
  };

  private setGroupDraggable = (draggable: boolean) => {
    if (this.groupRef.current) {
      this.groupRef.current.draggable(draggable);
    }
  };

  private refreshLayer = () => {
    if (this.layerRef.current) {
      this.layerRef.current.draw();
    }
  };

  private getBottomRight = () => {
    return {
      x: this.state.selectPos.x + this.state.selectWidth,
      y: this.state.selectPos.y + this.state.selectHeight,
    };
  };

  private getTopLeft = () => {
    return {
      x: this.state.selectPos.x,
      y: this.state.selectPos.y,
    };
  };
}

export default Canvas;
