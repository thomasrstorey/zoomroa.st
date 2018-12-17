import { KonvaEventObject } from 'konva';
import React from 'react';
import { Image as CanvasImage, Layer, Rect, Stage } from 'react-konva';

interface IProps {
  imageFile: File;
}

const onWheel = (event: KonvaEventObject<WheelEvent>) => {
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

const Canvas = (props: IProps) => {
  let imageNode: CanvasImage|null = null;
  const image = new Image();
  image.onload = () => {
    if (imageNode) {
      imageNode.getLayer().batchDraw();
    }
  };
  image.src = URL.createObjectURL(props.imageFile);
  return (
    <Stage
      width={900}
      height={600}
      draggable={true}
      onWheel={onWheel}
    >
      <Layer>
        <CanvasImage image={image} ref={(node: CanvasImage) => { imageNode = node; }} />
        <Rect x={450} y={300} width={200} height={200} stroke="yellow" strokeEnabled={true} strokeWidth={5} draggable={true} />
      </Layer>
    </Stage>
  );
};

export default Canvas;
