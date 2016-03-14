import Action, {Dispatcher, Dispatch} from './Action'
import Letter from '../domains/Letter'

const slack = require('slack')
const bot = slack.rtm.client()

export interface PostAction extends Action {
  type: string
  letter?: Letter
}

export function connectSlack(token: string): Dispatcher {
  let isConnect = false
  return (dispatch: Dispatch) => {
    if (isConnect) {
      bot.close()
      isConnect = false
    }
    bot.hello(() => isConnect = true)
    bot.message((message: any) => {
      const text = message.text
      const letter = new Letter({text})
      dispatch(addLetter(letter))
      // @todo magic number
      setTimeout(() => dispatch(removeLetter(letter)), 12000)
    })
    bot.listen({token})
  }
}

export function addLetter(letter: Letter): PostAction {
  return {type: ADD_LETTER, letter}
}

export function removeLetter(letter: Letter): PostAction {
  return {type: REMOVE_LETTER, letter}
}

export const ADD_LETTER = 'ADD_LETTER'
export const REMOVE_LETTER = 'REMOVE_LETTER'
