import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/app'
import Form from './components/form'
import Results from './components/results'

ReactDOM.render(
  <App>
    <Form />
    <Results />
  </App>,
  document.getElementById('root'))
