import { StringHelper, StringBuffer } from './helpers'

const assert = require('assert')

console.clear()

function testStringHelper() {
  const str = 'test'
  assert(StringHelper.exact(str, 5) === 'test ', 'StringHelper.exact #1')
}

function testStringBuffer() {
  const sb = new StringBuffer()
  const strings = ['hello', 'world']
  strings.forEach(str => sb.append(str))
  assert(sb.join(' ') === 'hello world', 'StringBuffer.join #1')
}

function where(e) {
  const lines = e.stack.split('\n').slice(1)
  const line = lines[0]
  const startIndex = line.lastIndexOf('/')
  const endIndex = line.lastIndexOf(')')
  return line.slice(startIndex + 1, endIndex)
}

const tests = [
  { name: 'StringHelper', func: testStringHelper },
  { name: 'StringBuffer', func: testStringBuffer }
]

function run(testSet) {
  let failures = 0
  let number = 1
  console.log('\nTESTING PACKAGE'.bold.underline);
  testSet.forEach((test) => {
    try {
      test.func()
      console.log(`#${number}:`, test.name.italic, '...OK'.green)
    } catch (e) {
      failures += 1
      console.log(`#${number}:`, test.name.italic, `...Fail ${e.message}(${where(e)})`.red)
    }
    number += 1
  })
  return failures
}

const failures = run(tests)
const passed = tests.length - failures

console.log('\nTEST REPORT'.bold.underline);
console.log('Success ratio:',
  `${(passed / tests.length * 100).toFixed(1)}% (${passed}/${tests.length})`);
if (failures === 0) {
  console.log('Well done! Your good to publish'.green.bold);
} else {
  console.log(`WARNING! ika-helpers failed ${failures} tests.`.yellow.bold);
}

console.log();
