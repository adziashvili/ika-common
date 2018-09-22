import { StringHelper, StringBuffer, TestSuite } from '../helpers'

const assert = require('assert')

console.clear()

function testStringHelperFRM() {
  // Setup
  const str = 'test'
  const greenStyle = StringHelper.getStyle('ika'.green)

  const ts = new TestSuite('StringHelper')
  ts.add('exact with space', () => assert.equal(StringHelper.exact(str, 5), 'test '))
  ts.add('prefix with space', () => assert.equal(StringHelper.prefix(str, 5), ' test'))
  ts.add('prefix with character', () => assert.equal(StringHelper.prefix(str, 5, '#'), '#test'))
  ts.add('Is styled string styled?', () => assert.equal(StringHelper.isStyled('test'.red), true))
  ts.add('Is non styled string styled?', () => assert.equal(StringHelper.isStyled('test'), false))
  ts.add('Apply extracted style', () => assert.equal(StringHelper.applyStyle(str, greenStyle), str.green))
  ts.add('Apply style by style example', () => assert.equal(StringHelper.style(str, 'ika'.red), str
    .red))
  return ts.run()
}

function testStringBufferFRM() {
  const sb = new StringBuffer()
  const strings = ['hello', 'world']
  strings.forEach(str => sb.append(str))
  const ts = new TestSuite('StringBuffer')
  ts.add('toString()', () => assert.equal(sb.toString(), 'helloworld'))
  ts.add('join(space)', () => assert.equal(sb.join(' '), 'hello world'))
  return ts.run()
}

// TODO: Use this with exceptions
function where(e, inStackIndex = 1) {
  const lines = e.stack.split('\n').slice(1)
  const line = lines[0]
  const startIndex = line.lastIndexOf('/')
  const endIndex = line.lastIndexOf(')')
  return line.slice(startIndex + inStackIndex, endIndex)
}

TestSuite.runTestSuites([testStringHelperFRM, testStringBufferFRM])

console.log();
