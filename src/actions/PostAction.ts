type Dispatcher = (dispatch: Dispatch)=>void
type Dispatch = (action: PostAction)=>void

export interface PostAction {
  type: string
  text?: string
}

export function startListen(text: string): Dispatcher {
  return (dispatch: Dispatch) => {
    const slack = require('slack')
    const bot = slack.rtm.client()
    bot.message((message: any) => {
      dispatch(addMessage(message.text))
    })
    bot.listen({token: process.env.SLACK_TOKEN})
  }
}

export function addMessage(text: string): PostAction {
  return {type: ADD_MESSAGE, text}
}

export const ADD_MESSAGE = 'ADD_MESSAGE'
