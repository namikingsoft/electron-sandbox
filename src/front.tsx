import 'babel-polyfill'
import * as React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import reducers from './reducers'
import App from './containers/App'

// load env file
require('node-env-file')(`${__dirname}/app.env`)

const createStoreWithMiddleware = applyMiddleware(
  require('redux-thunk').default
)(createStore)

render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>,
  document.getElementById('app')
)
