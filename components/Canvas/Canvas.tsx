import Konva from 'konva';
import React from 'react';
import { Group, Image as CanvasImage, Layer, Rect, Stage } from 'react-konva';

interface IProps {
  image: HTMLImageElement;
  onSelectionUpdate: (x: number, y: number, width: number, height: number) => void;
  canvasWidth?: number;
  canvasHeight?: number;
  selectWidth?: number;
  selectHeight?: number;
  anchorSize?: number;
}

const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 600;
const SELECT_START_WIDTH = 200;
const SELECT_START_HEIGHT = 200;
const ANCHOR_SIZE = 20;

const onWheel = (event: Konva.KonvaEventObject<WheelEvent>) => {
  event.evt.preventDefault();
  const scaleBy = 1.03;
  const stage = event.target.getStage();
  const currentScale = stage.scaleX();
  const newScale = event.evt.deltaY > 0 ? currentScale * scaleBy : currentScale / scaleBy;
  const currentPos = stage.getPointerPosition();
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
};

class Canvas extends React.Component<IProps> {
  private stageRef: React.RefObject<Konva.Stage> = React.createRef();
  private layerRef: React.RefObject<Konva.Layer> = React.createRef();
  private groupRef: React.RefObject<Konva.Group<Konva.Node>> = React.createRef();
  private imageRef: React.RefObject<Konva.Image> = React.createRef();
  private rectRef: React.RefObject<Konva.Rect> = React.createRef();
  private tlRef: React.RefObject<Konva.Rect> = React.createRef();
  private trRef: React.RefObject<Konva.Rect> = React.createRef();
  private brRef: React.RefObject<Konva.Rect> = React.createRef();
  private blRef: React.RefObject<Konva.Rect> = React.createRef();

  public shouldComponentUpdate(nextProps: IProps) {
    const currentImage = this.props.image;
    const nextImage = nextProps.image;
    return currentImage.src !== nextImage.src;
  }

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
    const stage = this.stageRef.current!;
    const group = this.groupRef.current!;
    stage.scale({ x: scaleFactor, y: scaleFactor });
    stage.position({ x: centerX, y: centerY });
    group.position({
      x: image.width / 2 - selectWidth / 2,
      y: image.height / 2 - selectHeight / 2,
    });
    this.props.onSelectionUpdate(group.x(), group.y(), selectWidth, selectHeight);
    this.layerRef.current!.batchDraw();
  }

  public render() {
    const {
      image,
      canvasWidth = CANVAS_WIDTH,
      canvasHeight = CANVAS_HEIGHT,
      selectWidth = SELECT_START_WIDTH,
      selectHeight = SELECT_START_HEIGHT,
      anchorSize = ANCHOR_SIZE,
    } = this.props;
    return (
      <Stage
        width={canvasWidth}
        height={canvasHeight}
        draggable={true}
        onWheel={onWheel}
        ref={this.stageRef}
      >
        <Layer ref={this.layerRef}>
          <CanvasImage image={image} ref={this.imageRef} />
          <Group
            x={0}
            y={0}
            ref={this.groupRef}
            draggable={true}
            onDragMove={() => {
              const rect = this.rectRef.current!;
              const group = this.groupRef.current!;
              const tl = this.tlRef.current!;
              this.props.onSelectionUpdate(group.x() + tl.x(), group.y() + tl.y(), rect.width(), rect.height());
            }}
          >
            <Rect
              x={0}
              y={0}
              width={selectWidth}
              height={selectHeight}
              stroke="yellow"
              strokeEnabled={true}
              strokeWidth={5}
              ref={this.rectRef}
            />
            <Rect
              ref={this.tlRef}
              x={0}
              y={0}
              fill="yellow"
              fillEnabled={true}
              width={anchorSize}
              height={anchorSize}
              offset={{ x: anchorSize / 2, y: anchorSize / 2 }}
              draggable={true}
              onMouseDown={this.onMouseDown}
              onDragMove={this.getOnDragMove(this.blRef, this.trRef)}
              onDragEnd={this.onDragEnd}
              onMouseOver={this.onMouseOver}
              onMouseOut={this.onMouseOut}
            />
            <Rect
              ref={this.trRef}
              x={200}
              y={0}
              fill="yellow"
              fillEnabled={true}
              width={anchorSize}
              height={anchorSize}
              offset={{ x: 10, y: 10 }}
              draggable={true}
              onMouseDown={this.onMouseDown}
              onDragMove={this.getOnDragMove(this.brRef, this.tlRef)}
              onDragEnd={this.onDragEnd}
              onMouseOver={this.onMouseOver}
              onMouseOut={this.onMouseOut}
            />
            <Rect
              ref={this.brRef}
              x={200}
              y={200}
              fill="yellow"
              fillEnabled={true}
              width={20}
              height={20}
              offset={{ x: 10, y: 10 }}
              draggable={true}
              onMouseDown={this.onMouseDown}
              onDragMove={this.getOnDragMove(this.trRef, this.blRef)}
              onDragEnd={this.onDragEnd}
              onMouseOver={this.onMouseOver}
              onMouseOut={this.onMouseOut}
            />
            <Rect
              ref={this.blRef}
              x={0}
              y={200}
              fill="yellow"
              fillEnabled={true}
              width={20}
              height={20}
              offset={{ x: 10, y: 10 }}
              draggable={true}
              onMouseDown={this.onMouseDown}
              onDragMove={this.getOnDragMove(this.tlRef, this.brRef)}
              onDragEnd={this.onDragEnd}
              onMouseOver={this.onMouseOver}
              onMouseOut={this.onMouseOut}
            />
          </Group>
        </Layer>
      </Stage>
    );
  }

  private getOnDragMove = (
  neighborXRef: React.RefObject<Konva.Node>,
  neighborYRef: React.RefObject<Konva.Node>,
  ) => (event: Konva.KonvaEventObject<DragEvent>) => {
    const active = event.currentTarget;
    const x = active.x();
    const y = active.y();
    const neighborX = neighborXRef.current!;
    const neighborY = neighborYRef.current!;
    const rect = this.rectRef.current!;
    const layer = this.layerRef.current!;
    const tl = this.tlRef.current!;
    const br = this.brRef.current!;
    neighborX.x(x);
    neighborY.y(y);
    const width = br.x() - tl.x();
    const height = br.y() - tl.y();
    rect.position(tl.position());
    rect.width(width);
    rect.height(height);
    const group = this.groupRef.current!;
    this.props.onSelectionUpdate(
      group.x() + tl.x(), group.y() + tl.y(), rect.width(), rect.height());
    layer.draw();
  }

  private onDragEnd = () => {
    if (this.groupRef.current) {
      this.groupRef.current.draggable(true);
    }
    if (this.layerRef.current) {
      this.layerRef.current.draw();
    }
  }

  private onMouseDown = () => {
    if (this.groupRef.current) {
      this.groupRef.current.draggable(false);
    }
  }

  private onMouseOver = (event: Konva.KonvaEventObject<MouseEvent>) => {
    const { anchorSize = ANCHOR_SIZE } = this.props;
    const size = anchorSize + 2;
    document.body.style.cursor = 'pointer';
    const rect = event.currentTarget as Konva.Rect;
    rect.moveToTop();
    rect.width(size);
    rect.height(size);
    rect.offset({x: size / 2, y: size / 2});
    if (this.layerRef.current) {
      this.layerRef.current.draw();
    }
  }

  private onMouseOut = (event: Konva.KonvaEventObject<MouseEvent>) => {
    const { anchorSize = ANCHOR_SIZE } = this.props;
    document.body.style.cursor = 'default';
    const rect = event.currentTarget as Konva.Rect;
    rect.width(anchorSize);
    rect.height(anchorSize);
    rect.offset({x: anchorSize / 2, y: anchorSize / 2});
    if (this.layerRef.current) {
      this.layerRef.current.draw();
    }
  }
}

export default Canvas;
