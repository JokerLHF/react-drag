import React, { ReactNode, useState, useRef, Fragment, memo } from 'react';
import classnames from 'classnames';

interface IProps {
  isStatic?: boolean;
  width?: number;
  height?: number;
  zIndex?: number;
  position: [number, number];
  children: ReactNode;
}

interface oriPosition {
  top: number;
  left: number;
  cX: number;
  cY: number;
  [name: string]: any;
}

enum Direction {
  North = 'n',
  East = 'e',
  West = 'w',
  South = 's',
  SouthEast = 'se',
  SouthWest = 'sw',
  NorthEast = 'ne',
  NorthWest = 'nw',
}

const point = Object.values(Direction);

const Drag = (props: IProps) => {

  const {
    isStatic = false,
    width = 100,
    height = 100,
    zIndex = 1,
    children,
    position,
  } = props;

  const isMouseDown = useRef(false);
  const direction = useRef<string>('');

  const [style, setStyle] = useState({
    // // https://www.coder.work/article/1308983
    // position: 'absolute' as 'absolute',
    width,
    height,
    zIndex,
    left: position[0],
    top: position[1]
  });

  const oriPosition = useRef<oriPosition>({
    top: 0, // element position
    left: 0,
    cX: 0, // mouse position
    cY: 0,
  });

  const handleMouseDown = (e: React.MouseEvent<HTMLElement>, dir = 'move') => {
    e.stopPropagation();

    isMouseDown.current = true;
    direction.current = dir;

    oriPosition.current = {
      ...style,
      // mouse position
      cX: e.clientX,
      cY: e.clientY,
    }
  }

  const handleMouseUp = (e: React.MouseEvent<HTMLElement>) => {

    e.stopPropagation();
    isMouseDown.current = false;
    direction.current = '';
    console.log('direction', direction.current);
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (!isMouseDown.current) return;

    const x = e.clientX, y = e.clientY;
    const style = handleTransform(direction.current, oriPosition.current, { x, y });

    setStyle(style as any);
  }

  const handleTransform = (direction: string, oriPos: oriPosition, clientPos: { x: number, y: number }) => {
    const newStyle = { ...oriPos };

    // 计算鼠标移动距离
    const offsetX = clientPos.x - oriPos.cX;
    const offsetY = clientPos.y - oriPos.cY;

    // 判断边界
    const container = document.getElementById('drag-container');
    const width = container?.offsetWidth || 0, height = container?.offsetHeight || 0;

    switch (direction) {
      case 'move':
        // 计算item位置
        const newTop = oriPos.top + offsetY;
        const newLeft = oriPos.left + offsetX;
        // Math.min计算下移边界 Math.max计算上移边界 
        newStyle.top = Math.max(0, Math.min(newTop, height - newStyle.height));
        newStyle.left = Math.max(0, Math.min(newLeft, width - newStyle.width));
        break;
      case Direction.North:
        newStyle.top += offsetY;
        newStyle.height -= offsetY;
      case Direction.East:
        newStyle.width += offsetX;
        break;
      case Direction.South:
        newStyle.height += offsetY;
        break;
      case Direction.West:
        newStyle.width -= offsetX;
        newStyle.left += offsetX;
        break;
      case Direction.NorthEast:
        newStyle.height -= offsetY;
        newStyle.top += offsetY;
        newStyle.width += offsetX;
        break;
      case Direction.NorthWest:
        newStyle.height -= offsetY;
        newStyle.top += offsetY;
        newStyle.width -= offsetX;
        newStyle.left += offsetX;
        break;
      case Direction.SouthEast:
        newStyle.height += offsetY;
        newStyle.width += offsetX;
        break;
      case Direction.SouthWest:
        newStyle.height += offsetY;
        newStyle.width -= offsetX;
        newStyle.left += offsetX;
        break;
    }
    // 限制拉伸的界限
    if (
      newStyle.top <= 0 ||
      newStyle.left <= 0 ||
      newStyle.height + newStyle.top > height ||
      newStyle.width + newStyle.left > width
    ) {
      return style;
    }
    return newStyle;
  }

  const renderDragItem = () => (
    <div
      style={style}
      className="drag-item"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {children}
      {point.map(item => (
        <div
          className={classnames('control-point', `point-${item}`)}
          key={item}
          onMouseDown={e => handleMouseDown(e, item)}
          onMouseUp={handleMouseUp}
        ></div>
      ))}
    </div>
  )

  return (
    <Fragment>
      {
        isStatic ? <div className="drag-item" style={style}>{children}</div> : renderDragItem()
      }
    </Fragment>
  )
}
export default memo(Drag)