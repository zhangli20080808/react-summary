/**
    // node         代表当前被drop 的对象
    // dragNode     代表当前需要drop 的对象
    // dropPosition 代表drop后的节点位置；不准确
    // dropToGap    代表移动到非最顶级组第一个位置
    https://www.cnblogs.com/weblinda/p/15239322.html
*/
import React, { useState } from "react";
import { Tree } from "antd";

const data = [
  {
    title: "Branch 1",
    key: "Branch 1",
    children: [
      {
        title: "Branch 1.1",
        key: "Branch 1.1"
      },
      {
        title: "Branch 1.2",
        key: "Branch 1.2"
      }
    ]
  },
  {
    title: "Branch 2",
    key: "Branch 2",
    children: [
      {
        title: "Branch 2.1",
        key: "Branch 2.1"
      },
      {
        title: "Branch 2.2",
        key: "Branch 2.2"
      }
    ]
  },
  {
    title: "Branch 3",
    key: "Branch 3",
    children: []
  }
];

export default function Demo() {
  const [treeData, setTreeData] = useState(data);
  const [positions, setPositions] = useState({});

  function onDrop(info) {
    console.log("info", info);
    const dragNode = info.dragNode; // 拖拽元素
    const dropNode = info.node; // 放置元素
    console.log(dragNode, dropNode);
    const isSameLevel = (a, b) => {
      const aLevel = a.props.pos.split("-").length;
      const bLevel = b.props.pos.split("-").length;
      return aLevel === bLevel;
    };

    const isSameParent = (a, b) => {
      const aLevel = a.props.pos.split("-");
      const bLevel = b.props.pos.split("-");
      aLevel.pop();
      bLevel.pop();
      return aLevel.join("") === bLevel.join("");
    };
    // 拥有相同父级并且处于统一层级，可拖拽
    const canDrop =
      isSameParent(dragNode, dropNode) &&
      isSameLevel(dragNode, dropNode) &&
      info.dropToGap;

    console.log(
      "aaaaaaaaaaaaaaaaaaaaa",
      isSameParent(dragNode, dropNode),
      isSameLevel(dragNode, dropNode),
      info.dropToGap
    );
    if (!canDrop) {
      return;
    }
    const sameLevel = isSameLevel(dragNode, dropNode);
    const sameParent = isSameParent(dragNode, dropNode);
    debugger
    setPositions({
      dragOver: dropNode.dragOver,
      dragOverGapBottom: dropNode.dragOverGapBottom,
      dragOverGapTop: dropNode.dragOverGapTop,
      dropToGap: dropNode.dropToGap
    });
    console.log("sameLevel", sameLevel);
    console.log("sameParent", sameParent);
    console.log("info.dropPosition", info.dropPosition);
    if (sameParent && sameLevel) {
      const dropKey = info.node.props.eventKey;
      const dragKey = info.dragNode.props.eventKey;
      const dropPos = info.node.props.pos.split("-");
      const dropPosition =
        info.dropPosition - Number(dropPos[dropPos.length - 1]);
      const loop = (data, key, callback) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].key === key) {
            return callback(data[i], i, data);
          }
          if (data[i].children) {
            loop(data[i].children, key, callback);
          }
        }
      };
      const data = [...treeData];

      // Find dragObject
      let dragObj;
      loop(data, dragKey, (item, index, arr) => {
        arr.splice(index, 1);
        dragObj = item;
      });

      if (!info.dropToGap) {
        // Drop on the content
        loop(data, dropKey, (item) => {
          item.children = item.children || [];
          // where to insert 示例添加到尾部，可以是随意位置
          item.children.push(dragObj);
        });
      } else if (
        (info.node.props.children || []).length > 0 && // Has children
        info.node.props.expanded && // Is expanded
        dropPosition === 1 // On the bottom gap
      ) {
        loop(data, dropKey, (item) => {
          item.children = item.children || [];
          // where to insert 示例添加到头部，可以是随意位置
          item.children.unshift(dragObj);
        });
      } else {
        let ar;
        let i;
        loop(data, dropKey, (item, index, arr) => {
          ar = arr;
          i = index;
        });
        if (dropPosition === -1) {
          ar.splice(i, 0, dragObj);
        } else {
          ar.splice(i + 1, 0, dragObj);
        }
      }

      console.log("data", data);
      setTreeData(data);
    }
  }
  return (
    <div>
      <div>{JSON.stringify(positions)}</div>
      <Tree defaultExpandAll draggable treeData={treeData} onDrop={onDrop} />
    </div>
  );
}
