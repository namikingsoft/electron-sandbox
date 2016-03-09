import * as action from '../constants/ActionConst'

type Dispatcher = (dispatch: Dispatch)=>any
type Dispatch = (action: PostAction)=>void

export interface PostAction {
  type: string
  text?: string
}

export function startListen(text: string): Dispatcher {
  let count = 0
  return (dispatch: Dispatch) => {
    setInterval(() => dispatch(addMessage(`Message ${++count}`)), 3000)
    return {type: action.START_LISTEN}
  }
}

export function addMessage(text: string): PostAction {
  return {type: action.ADD_MESSAGE, text}
}
