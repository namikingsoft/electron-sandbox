/// <reference path="../reference.d.ts" />
export interface Action {}
export type Dispatcher = (dispatch: Dispatch) => void
export type Dispatch = (action: Action) => void

export default Action
