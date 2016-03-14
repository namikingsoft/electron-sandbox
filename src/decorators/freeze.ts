export default function freeze<T extends Function>(Target: T): T {

  const newConstructor = function (...args: any[]) {
    Target.apply(this, args)
    for (const key in this) {
      const val = this[key]
      if (val instanceof Object) {
        Object.freeze(val)
      }
    }
    Object.freeze(this)
  }

  newConstructor.prototype = Object.create(Target.prototype)
  newConstructor.prototype.constructor = Target

  return <any>newConstructor
}
