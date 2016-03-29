/// <reference path="../reference.d.ts" />
import freeze from "../decorators/freeze"

@freeze
export default class SingleValue<T> {

  constructor(
    private value: T
  ) {}

  public valueOf(): T {
    return this.value
  }

  public toString(): string {
    return String(this.value)
  }

  public equals(target: SingleValue<T>): boolean {
    return this.value === target.valueOf()
  }
}
