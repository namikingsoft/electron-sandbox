/// <reference path="../reference.d.ts" />
import Action, {Dispatcher, Dispatch} from "./Action"
import LetterDelivery from "../domains/LetterDelivery"
import Letter from "../domains/Letter"

export interface PostAction extends Action {
  type: string
  letter?: Letter
}

export function connectSlack(token: string): Dispatcher {
  return (dispatch: Dispatch) => {
    new LetterDelivery(token)
    .onPost(letter => dispatch(addLetter(letter)))
    .catch(err => alert(err))
  }
}

export function addLetter(letter: Letter): PostAction {
  return {type: ADD_LETTER, letter}
}

export function removeLetter(letter: Letter): PostAction {
  return {type: REMOVE_LETTER, letter}
}

export const ADD_LETTER = "ADD_LETTER"
export const REMOVE_LETTER = "REMOVE_LETTER"
