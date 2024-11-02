import { sayHello } from '../src'

it('should say hello', () => {
  expect(sayHello()).toMatch(/Hello \w+ from node v\d+.\d+.\d+/)
})
