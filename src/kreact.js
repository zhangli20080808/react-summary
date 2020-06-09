function createElement(type, props, ...children) {
    console.log(arguments) // 虚拟dom的创建是由内向外的
    // 返回虚拟DOM
    props.children = children
    // 能够区分组件类型：  因为后续的dom操作要根据类型去做
    // vtype: 1-原生标签；2-函数组件；3-类组件
    let vtype;
    if (typeof type === 'function') {
        // class组件
        if (type.isReactComponent) {
            vtype = 3
        } else {
            // 函数组件
            vtype = 2
        }
    } else if (typeof type === 'string') {
        //原始标签
        vtype = 1
    }

    return {
        vtype,
        type,
        props
    }
}

export class Component {
    //标识符 区分class和函数组件
    static isReactComponent = true

    constructor(props) {
        this.props = props
        this.state = {}
    }

    setState() {
        console.log('1')
    }

    forceUpdate() {
    }
}

export default {createElement}