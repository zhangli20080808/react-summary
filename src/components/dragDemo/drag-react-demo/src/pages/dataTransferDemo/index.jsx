import React, { useState, useRef } from 'react';
import './index.css';

function DataTransferDemo() {
  const [currentData, setCurrentData] = useState([{ value: 'testDrag1' }, { value: 'testDrag2' }])
  const [dropData, setDropData] = useState([]);
  const [transferData, setTransferData] = useState([]);
  const childRef = useRef();
  const onDragStart = (e, item) => {
    console.log('>>>>>handle DragStart', e.dataTransfer);
    e.dataTransfer.setData('textDemo', item.value);
    
    // none/copy/link/move
    e.dataTransfer.effectAllowed = 'move';
  }
  const onDrag = (e) => {
  }
  const onDragEnd = (e) => {
    console.log('>>>>>handle DragEnd', e.dataTransfer);
    
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const itemValue = e.dataTransfer.getData('textDemo');
    setDropData([...dropData, { value: itemValue }]);
    console.log('>>>>>handleDrop', e.dataTransfer);
  }
  const handleDragOver = (e) => {
    // handleDragOver过程中要阻止默认事件否则不会触发handleDrop
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
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
      <div ref={childRef}>132</div>
      <div className='wrapDrag'>
        {
          currentData.map((item) => {
            return (
              <div
                className="draggable"
                draggable="true"
                onDragStart={(e) => onDragStart(e, item)}
                onDrag={(e) => onDrag(e)}
                onDragEnd={onDragEnd}
              >
                {item.value}
              </div>
            );
          })
        }
      </div>
      {
        <div
          className="wrapDrop"
          onDrop={(e) => handleDrop(e)}
          onDragOver={(e) => handleDragOver(e)}
          onDragEnter={() => handleDragEnter()}
          onDragLeave={() => handleDragLeave()}
        >
          drop
          {
            dropData.map((item) => {
              return (
                <div
                  className="draggable"
                  draggable="true"
                  onDragStart={onDragStart}
                  onDragEnd={onDragEnd}
                >
                  {item.value}
                </div>
              );
            })
          }
        </div>
      }
    </>

  );
}

export default React.memo(DataTransferDemo);
