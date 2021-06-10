import React, { ReactNode } from 'react';
import './index.less';

interface IProps {
  className?: string;
  children: ReactNode;
}


export const DragContainer = (props: IProps) => {
  return (
    <div
      className={props.className}
      id="drag-container"
    >
      {props.children}
    </div>
  )
}