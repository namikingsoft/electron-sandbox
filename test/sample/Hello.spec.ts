import * as assert from 'power-assert'

describe('Hello', function() {

  const Hello = () => 'World'

  it('should be return World', () => {
    assert(Hello() === 'World')
  })
})
