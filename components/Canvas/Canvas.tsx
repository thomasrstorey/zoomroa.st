import Konva from 'konva';
import React from 'react';
import { Group, Image as CanvasImage, KonvaContainerComponent, Layer, Rect, Stage } from 'react-konva';

type TGroup = KonvaContainerComponent<Konva.Group<Konva.Node>, Konva.ContainerConfig>;

interface IProps {
  imageFile: File;
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

const Canvas = (props: IProps) => {
  let imageNode: Konva.Image|null = null;
  let group: Konva.Group<Konva.Node>|null = null;
  let layer: Konva.Layer|null;
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
      <Layer ref={(node: Konva.Layer) => { layer = node; }}>
        <CanvasImage image={image} ref={(node: Konva.Image) => { imageNode = node; }} />
        <Group x={450} y={300} ref={(node) => { group = node; }} draggable={true}>
          <Rect
            x={0}
            y={0}
            fill="yellow"
            fillEnabled={true}
            width={20}
            height={20}
            offset={{ x: 10, y: 10 }}
            draggable={true}
            onMouseDown={(event: Konva.KonvaEventObject<MouseEvent>) => {
              if (group) {
                group.draggable(false);
              }
            }}
            onDragMove={(event: Konva.KonvaEventObject<DragEvent>) => {

            }}
            onDragEnd={() => {
              if (group) {
                group.draggable(true);
              }
              if (layer) {
                layer.draw();
              }
            }}
            onMouseOver={(event: Konva.KonvaEventObject<MouseEvent>) => {
              document.body.style.cursor = 'pointer';
              const rect = event.currentTarget as Konva.Rect;
              rect.moveToTop();
              rect.width(22);
              rect.height(22);
              rect.offset({x: 11, y: 11 });
              if (layer) {
                layer.draw();
              }
            }}
            onMouseOut={(event: Konva.KonvaEventObject<MouseEvent>) => {
              document.body.style.cursor = 'default';
              const rect = event.currentTarget as Konva.Rect;
              rect.width(20);
              rect.height(20);
              rect.offset({x: 10, y: 10 });
              if (layer) {
                layer.draw();
              }
            }}
          />
          <Rect
            x={0}
            y={0}
            width={200}
            height={200}
            stroke="yellow"
            strokeEnabled={true}
            strokeWidth={5}
          />
        </Group>
      </Layer>
    </Stage>
  );
};

export default Canvas;
