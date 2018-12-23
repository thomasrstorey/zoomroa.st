import Konva from 'konva';
import React from 'react';
import { Group, Image as CanvasImage, KonvaContainerComponent, Layer, Rect, Stage } from 'react-konva';

interface IProps {
  imageFile: File;
  onSelectionUpdate: (x: number, y: number, width: number, height: number) => void;
}

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

const getOnMouseOver = (x: number, y: number, layerRef: React.RefObject<Konva.Layer>) =>
  (event: Konva.KonvaEventObject<MouseEvent>) => {
    document.body.style.cursor = 'pointer';
    const rect = event.currentTarget as Konva.Rect;
    rect.moveToTop();
    rect.width(22);
    rect.height(22);
    rect.offset({x, y});
    if (layerRef.current) {
      layerRef.current.draw();
    }
  };

const getOnMouseOut = (x: number, y: number, layerRef: React.RefObject<Konva.Layer>) =>
  (event: Konva.KonvaEventObject<MouseEvent>) => {
    document.body.style.cursor = 'default';
    const rect = event.currentTarget as Konva.Rect;
    rect.width(20);
    rect.height(20);
    rect.offset({x, y});
    if (layerRef.current) {
      layerRef.current.draw();
    }
  };

const getOnDragEnd = (
  layerRef: React.RefObject<Konva.Layer>,
  groupRef: React.RefObject<Konva.Group>) =>
  () => {
    if (groupRef.current) {
      groupRef.current.draggable(true);
    }
    if (layerRef.current) {
      layerRef.current.draw();
    }
  };

const getOnMouseDown = (groupRef: React.RefObject<Konva.Group>) =>
  () => {
    if (groupRef.current) {
      groupRef.current.draggable(false);
    }
  };

const getOnDragMove = (
  neighborXRef: React.RefObject<Konva.Node>,
  neighborYRef: React.RefObject<Konva.Node>,
  tlRef: React.RefObject<Konva.Node>,
  brRef: React.RefObject<Konva.Node>,
  rectRef: React.RefObject<Konva.Rect>,
  groupRef: React.RefObject<Konva.Group>,
  layerRef: React.RefObject<Konva.Layer>,
  callback: (x: number, y: number, width: number, height: number) => void,
  ) => (event: Konva.KonvaEventObject<DragEvent>) => {
    const active = event.currentTarget;
    const x = active.x();
    const y = active.y();
    const neighborX = neighborXRef.current!;
    const neighborY = neighborYRef.current!;
    const rect = rectRef.current!;
    const layer = layerRef.current!;
    const tl = tlRef.current!;
    const br = brRef.current!;
    neighborX.x(x);
    neighborY.y(y);
    const width = br.x() - tl.x();
    const height = br.y() - tl.y();
    rect.position(tl.position());
    if (width && height) {
      rect.width(width);
      rect.height(height);
    }
    const group = groupRef.current!;
    callback(group.x() + tl.x(), group.y() + tl.y(), rect.width(), rect.height());
    layer.draw();
  };

class Canvas extends React.Component<IProps> {
  public shouldComponentUpdate(nextProps: IProps) {
    const currentFile = this.props.imageFile;
    const nextFile = nextProps.imageFile;
    return currentFile.name !== nextFile.name;
  }

  public render() {
    const imageRef: React.RefObject<Konva.Image> = React.createRef();
    const groupRef: React.RefObject<Konva.Group<Konva.Node>> = React.createRef();
    const layerRef: React.RefObject<Konva.Layer> = React.createRef();
    const rectRef: React.RefObject<Konva.Rect> = React.createRef();
    const tlRef: React.RefObject<Konva.Rect> = React.createRef();
    const trRef: React.RefObject<Konva.Rect> = React.createRef();
    const brRef: React.RefObject<Konva.Rect> = React.createRef();
    const blRef: React.RefObject<Konva.Rect> = React.createRef();
    const image = new Image();
    image.onload = () => {
      if (imageRef.current) {
        imageRef.current.getLayer().batchDraw();
      }
    };
    image.src = URL.createObjectURL(this.props.imageFile);
    return (
      <Stage
        width={900}
        height={600}
        draggable={true}
        onWheel={onWheel}
      >
        <Layer ref={layerRef}>
          <CanvasImage image={image} ref={imageRef} />
          <Group
            x={450}
            y={300}
            ref={groupRef}
            draggable={true}
            onDragMove={() => {
              const rect = rectRef.current!;
              const group = groupRef.current!;
              const tl = tlRef.current!;
              this.props.onSelectionUpdate(group.x() + tl.x(), group.y() + tl.y(), rect.width(), rect.height());
            }}
          >
            <Rect
              x={0}
              y={0}
              width={200}
              height={200}
              stroke="yellow"
              strokeEnabled={true}
              strokeWidth={5}
              ref={rectRef}
            />
            <Rect
              ref={tlRef}
              x={0}
              y={0}
              fill="yellow"
              fillEnabled={true}
              width={20}
              height={20}
              offset={{ x: 10, y: 10 }}
              draggable={true}
              onMouseDown={getOnMouseDown(groupRef)}
              onDragMove={getOnDragMove(
                blRef,
                trRef,
                tlRef,
                brRef,
                rectRef,
                groupRef,
                layerRef,
                this.props.onSelectionUpdate)}
              onDragEnd={getOnDragEnd(layerRef, groupRef)}
              onMouseOver={getOnMouseOver(11, 11, layerRef)}
              onMouseOut={getOnMouseOut(10, 10, layerRef)}
            />
            <Rect
              ref={trRef}
              x={200}
              y={0}
              fill="yellow"
              fillEnabled={true}
              width={20}
              height={20}
              offset={{ x: 10, y: 10 }}
              draggable={true}
              onMouseDown={getOnMouseDown(groupRef)}
              onDragMove={getOnDragMove(brRef,
                tlRef,
                tlRef,
                brRef,
                rectRef,
                groupRef,
                layerRef,
                this.props.onSelectionUpdate)}
              onDragEnd={getOnDragEnd(layerRef, groupRef)}
              onMouseOver={getOnMouseOver(11, 11, layerRef)}
              onMouseOut={getOnMouseOut(10, 10, layerRef)}
            />
            <Rect
              ref={brRef}
              x={200}
              y={200}
              fill="yellow"
              fillEnabled={true}
              width={20}
              height={20}
              offset={{ x: 10, y: 10 }}
              draggable={true}
              onMouseDown={getOnMouseDown(groupRef)}
              onDragMove={getOnDragMove(trRef,
                blRef,
                tlRef,
                brRef,
                rectRef,
                groupRef,
                layerRef,
                this.props.onSelectionUpdate)}
              onDragEnd={getOnDragEnd(layerRef, groupRef)}
              onMouseOver={getOnMouseOver(11, 11, layerRef)}
              onMouseOut={getOnMouseOut(10, 10, layerRef)}
            />
            <Rect
              ref={blRef}
              x={0}
              y={200}
              fill="yellow"
              fillEnabled={true}
              width={20}
              height={20}
              offset={{ x: 10, y: 10 }}
              draggable={true}
              onMouseDown={getOnMouseDown(groupRef)}
              onDragMove={getOnDragMove(tlRef,
                brRef,
                tlRef,
                brRef,
                rectRef,
                groupRef,
                layerRef,
                this.props.onSelectionUpdate)}
              onDragEnd={getOnDragEnd(layerRef, groupRef)}
              onMouseOver={getOnMouseOver(11, 11, layerRef)}
              onMouseOut={getOnMouseOut(10, 10, layerRef)}
            />
          </Group>
        </Layer>
      </Stage>
    );
  }
}

export default Canvas;
