import React from 'react'
import ReactDOM from 'react-dom'
import Page from './page/index.tsx'

const rootDom = document.getElementById('app-root')

ReactDOM.render(<Page />, rootDom)

if (module.hot) {
  module.hot.accept()
}
