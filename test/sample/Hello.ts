const assert = require('power-assert')
const Hello = () => 'World'

describe('Hello', function() {

  it('should be return World', () => {
    assert(Hello() === 'World')
  })
})
