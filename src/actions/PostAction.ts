import Action, {Dispatcher, Dispatch} from './Action'
import Letter from '../domains/Letter'

export interface PostAction extends Action {
  type: string
  letter?: Letter
}

export function startListen(text: string): Dispatcher {
  return (dispatch: Dispatch) => {
    const slack = require('slack')
    const bot = slack.rtm.client()
    bot.message((message: any) => {
      const text = message.text
      const letter = new Letter({text})
      dispatch(addLetter(letter))
      // @todo magic number
      setTimeout(() => dispatch(removeLetter(letter)), 12000)
    })
    bot.listen({token: process.env.SLACK_TOKEN})
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
