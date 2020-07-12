import React from 'react'

class ListDemo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [],
      initId: 0
    }
  }

  componentDidMount () {
    console.log('我是子组件')
  }

  add = () => {
    const { initId, list } = this.state
    const newId = initId + 1
    const data = {
      id: 0,
      selectedId: '',
      title: '123',
      onlyInitId: `only_${initId}`,
      initId
    }
    const newData = [...list]
    newData[initId] = [{ ...data }]
    this.setState({
      list: newData,
      initId: newId
    })
  }

  add2 = (value) => {
    const newList = [...this.state.list]
    if (value.length === 1) {
      const data = { ...value[0] }
      const item = {
        id: data.id + 1,
        selectedId: '',
        title: '123',
        onlyInitId: data.onlyInitId,
        initId: data.initId
      }
      newList[data.initId].push(item)
      this.handlePropsLast(newList, data)
    }
  }

  add3 = item => {
    const newList = [...this.state.list]
    const data = {
      id: item.id + 1,
      selectedId: '',
      title: '123',
      onlyInitId: item.onlyInitId,
      initId: item.initId
    }
    newList[item.initId].forEach(item => item.last = false)
    newList[data.initId].push(data)
    this.handlePropsLast(newList, data)
  }

  delete = (item) => {
    const newList = [...this.state.list]
    newList[item.initId].splice(item.id, 1)
    this.handlePropsLast(newList, item)
  }

  handlePropsLast = (arr, item) => {
    arr[item.initId][arr[item.initId].length - 1]['last'] = true
    this.setState({ list: arr })
  }

  render () {
    // console.log('子组件render')
    console.log(this.state.list)
    return <>
      <button onClick={this.add}>创建</button>
      { /* vue v-for */
        this.state.list.map(
          (item, index) => {
            // 这里的 key 和 Vue 的 key 类似，必填，不能是 index 或 random
            const listItem = item.map(item => {
              return <li key={item.id} className={item.onlyInitId}>
                <input type="text"/>
                {
                  item.last && <span><button onClick={() => this.add3(item)}>添加</button><button
                    onClick={() => this.delete(item)}>删除</button></span>
                }
              </li>
            })
            return <div className={`content_${index}`} style={{ marginBottom: 30, background: 'red' }} key={index}>
              <ul>
                {listItem}
                <span> {item.length === 1 && <button onClick={() => this.add2(item)}>添加</button>}</span>
              </ul>
            </div>
          }
        )
      }
    </>
  }
}

export default ListDemo
