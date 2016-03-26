/// <reference path="../reference.d.ts" />
import {combineReducers} from "redux"
import post from "./post"
import setting from "./setting"

export default combineReducers({
  post, setting,
})
