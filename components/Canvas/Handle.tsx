import Konva from 'konva';
import type { Vector2d } from 'konva/lib/types';
import React from 'react';
import { Group, Rect } from 'react-konva';

interface IProps {
  x: number,
  y: number,
  scale: number,
  onUpdate: (pos: Vector2d) => void,
  setGroupDraggable: (draggable: boolean) => void,
  refreshLayer: () => void,
}

function Handle({ x, y, scale, onUpdate, setGroupDraggable, refreshLayer }: IProps) {
  const handleSize = Math.max(20, Math.floor(20 / scale));
  const onDragMove = (event: Konva.KonvaEventObject<DragEvent>) => {
    const active = event.currentTarget;
    const x = active.x();
    const y = active.y();
    onUpdate({ x, y });
    refreshLayer();
  };

  const onDragEnd = () => {
    setGroupDraggable(true);
    refreshLayer();
  };

  const onMouseDown = () => {
    setGroupDraggable(false);
  };

  const onMouseOver = (event: Konva.KonvaEventObject<MouseEvent>) => {
    document.body.style.cursor = 'grab';
    const rect = event.currentTarget as Konva.Rect;
    rect.moveToTop();
    rect.stroke('yellow');
    refreshLayer();
  };

  const onMouseOut = (event: Konva.KonvaEventObject<MouseEvent>) => {
    document.body.style.cursor = 'default';
    const rect = event.currentTarget as Konva.Rect;
    rect.stroke('white');
    rect.height(handleSize);
    refreshLayer();
  };
  return (
    <Group>
      <Rect
        x={x}
        y={y}
        offset={{ x: (handleSize + 4) / 2, y: (handleSize + 4) / 2 }}
        width={handleSize + 4}
        height={handleSize + 4}
        stroke={'black'}
        strokeWidth={Math.max(2, Math.floor(2 / scale))}
        strokeEnabled={true}
      />
      <Rect
        x={x}
        y={y}
        offset={{ x: (handleSize - 4) / 2, y: (handleSize - 4) / 2 }}
        width={handleSize - 4}
        height={handleSize - 4}
        stroke={'black'}
        strokeWidth={Math.max(2, Math.floor(2 / scale))}
        strokeEnabled={true}
      />
      <Rect
        x={x}
        y={y}
        offset={{ x: handleSize / 2, y: handleSize / 2 }}
        draggable={true}
        width={handleSize}
        height={handleSize}
        stroke={'white'}
        strokeWidth={Math.max(2, Math.floor(2 / scale))}
        strokeEnabled={true}
        onMouseOver={onMouseOver}
        onMouseDown={onMouseDown}
        onDragMove={onDragMove}
        onDragEnd={onDragEnd}
        onMouseOut={onMouseOut}
      />
    </Group>
  );
}

export default Handle;
