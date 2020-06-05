export default function initVNode(vnode) {
    let {vtype} = vnode
    if (!vtype) {
        //文本节点
        return document.createTextNode(vnode)
    }
    // vtype: 1-原生标签；2-函数组件；3-类组件
    if (vtype === 1) {
        //原生标签
        return createNativeElement(vnode)
    } else if (vtype === 2) {
        //函数组件
        return createFuncComp(vnode)
    } else {
        //类组件
        return createClassComp(vnode)
    }
}

function createNativeElement(vnode) {
    const {type, props} = vnode
    //'div'  {id:'demo',children:[],key,ref}
    const node = document.createElement(type);
    const {key, children, ...rest} = props
    Object.keys(rest).forEach(item => {
        // 需特殊处理的htmlFor，className
        if (item === 'className') {
            node.setAttribute('class', rest[item])
        } else if (item === "htmlFor") {
            node.setAttribute("for", rest[item])
        } else {
            node.setAttribute(item, rest[item])
        }
    })
    //递归子元素
    children.forEach(key => {
        node.appendChild(initVNode(key))
    });
    return node
}

function createFuncComp(vnode) {
    const {type, props} = vnode;
    // function   此处type是一个函数
    const newVNode = type(props);
    return initVNode(newVNode)
}

function createClassComp(vnode) {
    const {type, props} = vnode;
    // class xxx  此处type是一个class
    const comp = new type(props);
    //vnode 如何得到？ 调用组件自身的 render方法
    const newVNode = comp.render();
    //一定要记住 要转化成真实节点
    return initVNode(newVNode)
}