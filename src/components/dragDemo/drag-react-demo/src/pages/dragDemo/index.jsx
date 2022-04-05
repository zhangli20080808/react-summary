import React from 'react';
import logo from '../../assets/logo192.png';
import './index.css'

function DragDemo() {
  const onDragStart = (e) => {
    console.log('>>>>>handle DragStart');
  }
  const onDragEnd = (e) => {
    console.log('>>>>>handle DragEnd');
  }
  const onDrag = (e) => {
    console.log('>>>>>handle Drag');
  }
  return (
    <div className='wrapDrag'>
      <div
        draggable="true"
        onDragStart={onDragStart}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
      >
        index1 draggable
      </div>
      <img draggable="false" alt='logo' src={logo} />
      <div>inedx2</div>
    </div>
  );
}

export default React.memo(DragDemo);
