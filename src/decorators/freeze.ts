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

  // @todo
  //return <any>newConstructor
  const newConstructorAny: any = newConstructor
  return newConstructorAny
}

export function example<T extends Function>(baseClass: T): T | void {
  function construct(constructor: T, args: any[]) {
    const decorateClass: any = () => {
      return constructor.apply(this, args)
    }
    decorateClass.prototype = constructor.prototype
    return new decorateClass()
  }
  const decorateClass: any = (...args: any[]) => {
    const instance = construct(baseClass, args)
    Object.freeze(instance)
    return instance
  }
  decorateClass.prototype = baseClass.prototype

  return decorateClass
}
