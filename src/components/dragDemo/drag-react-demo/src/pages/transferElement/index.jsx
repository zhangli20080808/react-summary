import React, { useState } from 'react';
import './index.css';

function TransferElement() {
  const [currentData, setCurrentData] = useState([{ value: 'testDrag1' }, { value: 'testDrag2' }])
  const [dropData, setDropData] = useState([]);
  const [transferData, setTransferData] = useState([]);
  const onDragStart = (e, item) => {
    console.log('>>>>>handle DragStart');
    e.dataTransfer.setData('item', item.value);
    const newCurrentData = currentData.filter(i => { return i.value !== item.value });
    setTransferData(newCurrentData);
  }
  const onDragEnd = (e) => {
    console.log('>>>>>handle DragEnd', transferData);
    setCurrentData(transferData);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const itemValue = e.dataTransfer.getData('item');
    setDropData([...dropData, { value: itemValue }]);
    console.log('>>>>>handleDrop', itemValue);
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
        {
          currentData.map((item) => {
            return (
              <div
                className="draggable"
                draggable="true"
                onDragStart={(e) => onDragStart(e, item)}
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

export default React.memo(TransferElement);
