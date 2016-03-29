/// <reference path="../reference.d.ts" />
import SingleValue from "./SingleValue"
import freeze from "../decorators/freeze"

@freeze
export default class Message extends SingleValue<string> {

  public toDisplay(): string {
    if (this.valueOf()) {
      return this.toString().replace(/<[^<>]*>/g, "")
    } else  {
      return ""
    }
  }
}
