import renameFunction from 'utils/renameFunction'
import * as assert from 'power-assert'

describe('renameFunction', function() {

  it('should be return renamed function', () => {
    const func = renameFunction('newName', function() {})
    assert(func.name === 'newName')
  })

  it('should be function name removed [^a-zA-Z0-9]', () => {
    const func = renameFunction('"xss" ${test}', function() {})
    assert(func.name === 'xsstest')
  })
})
