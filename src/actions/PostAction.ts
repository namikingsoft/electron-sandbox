import * as action from '../constants/ActionConst'

export interface PostAction {
  type: string
  text: string
}

export function addMessage(text: string): PostAction {
  return {type: action.ADD_MESSAGE, text}
}
