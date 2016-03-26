/// <reference path="../reference.d.ts" />
import * as uuid from "node-uuid"
import SingleValue from "../domains/SingleValue"
import freeze from "../decorators/freeze"

@freeze
export default class UniqueID extends SingleValue<string> {
  constructor(uid: string = null) {
    super(uid || uuid.v1())
  }
}
