import 'babel-polyfill'
import * as React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducers from './reducers'
import App from './containers/App'

render(
  <Provider store={createStore(reducers)}>
    <App />
  </Provider>,
  document.getElementById('app')
)
