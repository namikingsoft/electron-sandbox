// @refs http://stackoverflow.com/a/22880379
export default function renameFunction(name: string, func: Function): Function {
  name = name.replace(/[^a-zA-Z0-9]/g, "")
  return (new Function(`
    return function (call) {
      return function ${name}() {
        return call(this, arguments)
      }
    }
  `)())(Function.apply.bind(func))
}
