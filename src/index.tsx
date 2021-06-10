import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Drag from './compoments/drag';
import { DragContainer } from './compoments/dragContainer';

import './index.less';

const App = () => (
  <Fragment>
    <DragContainer className="drag-container">
      <Drag position={[0, 0]} isStatic>
        first
      </Drag>
      <Drag position={[0, 0]}>
        second
      </Drag>
      <Drag position={[0, 0]}>
        third
      </Drag>
    </DragContainer>
  </Fragment>
)
ReactDOM.render(<App />, document.getElementById('root'));
