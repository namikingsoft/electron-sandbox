import Team from 'domains/Team'
import * as assert from 'power-assert'

describe('Team', function() {

  let team: Team

  before(() => {
    team = new Team({
      id: 'ID',
      name: 'Name',
      domain: 'Domain',
    })
  })

  describe('new', () => {
    it('should be return new instance', () => {
      assert(team instanceof Team)
    })
  })

  describe('id', () => {
    it('should be return initial value', () => {
      assert(team.id === 'ID')
    })
  })

  describe('name', () => {
    it('should be return initial value', () => {
      assert(team.name === 'Name')
    })
  })

  describe('domain', () => {
    it('should be return initial value', () => {
      assert(team.domain === 'Domain')
    })
  })
})
