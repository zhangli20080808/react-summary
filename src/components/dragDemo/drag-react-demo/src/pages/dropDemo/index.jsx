import React from 'react';
import './index.css';

function DragDemo() {
  const onDragStart = (e) => {
    // console.log('>>>>>handle DragStart');
  }
  const onDragEnd = (e) => {
    // console.log('>>>>>handle DragEnd');
  }
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('>>>>>handleDrop');
  }
  const handleDragOver = (e) => {
    // handleDragOver过程中一定要组织默认事件否则不会触发handleDrop
    e.preventDefault();
    e.stopPropagation();
    console.log('>>>>>handleDragOver');
  }
  const handleDragEnter = (e) => {
    console.log('>>>>>handleDragEnter');
  }
  const handleDragLeave = (e) => {
    console.log('>>>>>handleDragLeave');
  }

  return (
    <>
      <div className='wrapDrag'>
        <div
          className="draggable"
          draggable="true"
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        >
          index1 draggable
        </div>
      </div>
      <div
        className="wrapDrop"
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragEnter={() => handleDragEnter()}
        onDragLeave={() => handleDragLeave()}
      >
        drop
      </div>
    </>

  );
}

export default React.memo(DragDemo);
