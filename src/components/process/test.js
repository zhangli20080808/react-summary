// const onDrop = (info) => {
//     const { node, dragNode, dropPosition, dropToGap, event, dragNodesKeys } = info;
//     // node         代表当前被drop 的对象
//     // dragNode     代表当前需要drop 的对象
//     // dropPosition 代表drop后的节点位置；不准确
//     // dropToGap    代表移动到非最顶级组第一个位置
//     const dropKey = node.key;
//     const dragKey = dragNode.key;
//     const dropPos = node.pos.split('-');
 
//     // trueDropPosition: ( -1 | 0 | 1 ) dropPosition计算前的值，可以查看rc-tree源码;
//     // -1 代表移动到最顶级组的第一个位置
//     const trueDropPosition = dropPosition - Number(dropPos[dropPos.length - 1]);
//     const data = [...gData];
 
//     loop(data, dragKey, (item, index, arr) => {
//       arr.splice(index, 1);
//     });
//     if (!dropToGap) {
//       // 移动到非最顶级组第一个位置
//       loop(data, dropKey, (item) => {
//         item.children = item.children || [];
//         // where to insert 示例添加到头部，可以是随意位置
//         item.children.unshift(dragNode);
//       });
//     } else {
//       // 平级移动、交叉组移动、移动到其他组(非最顶级)非第一个位置
      
//       let ar;
//       let i;
//       loop(data, dropKey, (item, index, arr) => {
//         ar = arr;
//         i = index;
//       });
//       if (trueDropPosition === -1) {
//         // 移动到最顶级第一个位置
//         ar.splice(i, 0, dragNode);
//       } else {
//         // trueDropPosition:   1 | 0
//         ar.splice(i + 1, 0, dragNode);
//       }
//     }
 
//   };