/// <reference path="../reference.d.ts" />
import renameFunction from "../utils/renameFunction"

export default function freeze<T extends Function>(Target: T): T {

  const newConstructor = renameFunction(Target.name, function(...args: any[]) {
    Target.apply(this, args)
    for (const key in this) {
      const val = this[key]
      if (val instanceof Object) {
        Object.freeze(val)
      }
    }
    Object.freeze(this)
  })

  newConstructor.prototype = Object.create(Target.prototype)
  newConstructor.prototype.constructor = Target

  return <any>newConstructor
}
