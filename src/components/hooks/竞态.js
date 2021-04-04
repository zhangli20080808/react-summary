import React, { useEffect, useState } from 'react'

const API = {
  async fetchArticle () {
    return new Promise(((resolve, reject) => {
      setTimeout(() => {
        resolve({ article: '123', name: 'zl' })
      }, 1000)
    }))
  }
}

function Article (id) {
  const [article, setArticle] = useState({})
  useEffect(() => {
    let didCancel = false

    async function getArticle () {
      const { article } = await API.fetchArticle(id)
      if (!didCancel) {
        setArticle(article)
      }
    }

    getArticle()
    return () => {
      didCancel = true
    }
  })
  return <div>{article}</div>
}

function App () {
  const [id, setId] = useState(0)
  return <div>
    <div>id: {id}</div>
    <Article id={id}/>
  </div>
}
