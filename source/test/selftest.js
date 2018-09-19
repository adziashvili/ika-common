import { StringHelper, StringBuffer } from '../helpers'

const assert = require('assert')

console.clear()

function testStringHelper() {
  const str = 'test'
  assert.equal(StringHelper.exact(str, 5), 'test ', 'StringHelper.exact')
  assert.equal(StringHelper.prefix(str, 5), ' test', 'StringHelper.prefix(str, 5)')
  assert.equal(StringHelper.prefix(str, 5, '#'), '#test', 'StringHelper.prefix(str, 5, \'#\')')
}

function testStringBuffer() {
  const sb = new StringBuffer()
  const strings = ['hello', 'world']
  strings.forEach(str => sb.append(str))
  assert.equal(sb.toString(), 'helloworld', 'StringBuffer.toString()')
  assert.equal(sb.join(' '), 'hello world', 'StringBuffer.join()')
}

function where(e, inStackIndex = 1) {
  const lines = e.stack.split('\n').slice(1)
  const line = lines[0]
  const startIndex = line.lastIndexOf('/')
  const endIndex = line.lastIndexOf(')')
  return line.slice(startIndex + inStackIndex, endIndex)
}

const tests = [
  { name: 'StringHelper', func: testStringHelper },
  { name: 'StringBuffer', func: testStringBuffer }
]

function run(testSet) {
  let testSetsFailed = 0
  let number = 1
  console.log('\nTESTING PACKAGE'.bold.underline);
  testSet.forEach((test) => {
    try {
      test.func()
      console.log(`#${number}:`, test.name.italic, '...OK'.green)
    } catch (e) {
      console.log(e);
      testSetsFailed += 1
      console.log(`#${number}:`, test.name.italic, `...Fail ${e.message}(${where(e)})`.red)
    }
    number += 1
  })
  return testSetsFailed
}

const testSetsFailed = run(tests)
const passed = tests.length - testSetsFailed

console.log('\nTEST REPORT'.bold.underline);
console.log('Success ratio:',
  `${(passed / tests.length * 100).toFixed(1)}% (${passed}/${tests.length})`);
if (testSetsFailed === 0) {
  console.log('Well done! Your good to publish'.green.bold);
} else {
  console.log(`WARNING! ika-helpers failed ${testSetsFailed} tests.`.yellow.bold);
}

console.log();
