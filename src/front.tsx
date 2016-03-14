import 'babel-polyfill'
import * as React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import {Router, Route, hashHistory} from 'react-router'
import IndexContainer from './containers/IndexContainer'
import StreamContainer from './containers/StreamContainer'
import SettingContainer from './containers/SettingContainer'
import reducers from './reducers'

const createStoreWithMiddleware = applyMiddleware(
  require('redux-thunk').default
)(createStore)

render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={hashHistory}>
      <Route path="/" component={IndexContainer} />
      <Route path="/refresh" component={IndexContainer} />
      <Route path="/stream" component={StreamContainer} />
      <Route path="/setting" component={SettingContainer} />
      <Route path="*" component={IndexContainer} />
    </Router>
  </Provider>,
  document.getElementById('app')
)
