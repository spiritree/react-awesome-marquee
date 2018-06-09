import React from 'react'
import ReactDOM from 'react-dom'
import Page from './page'

import './styles/css.css'

const rootDom = document.getElementById('app-root')

ReactDOM.render(<Page />, rootDom)

if (module.hot) {
  module.hot.accept()
}