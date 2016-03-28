import "babel-polyfill"
import * as React from "react"
import {render} from "react-dom"
import {createStore, applyMiddleware} from "redux"
import {Provider} from "react-redux"
import {Router, Route, Redirect, hashHistory} from "react-router"
import MainContainer from './containers/MainContainer'
import TypingContainer from "./containers/TypingContainer"
import StreamContainer from "./containers/StreamContainer"
import SettingContainer from "./containers/SettingContainer"
import reducers from "./reducers"

const createStoreWithMiddleware = applyMiddleware(
  require("redux-thunk").default
)(createStore)

render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={hashHistory}>
      <Route path="/" component={MainContainer}>
        <Route path="/typing" component={TypingContainer} />
        <Route path="/stream" component={StreamContainer} />
      </Route>
      <Route path="/setting" component={SettingContainer} />
      <Redirect from="*" to="/typing" />
    </Router>
  </Provider>,
  document.getElementById("app")
)
