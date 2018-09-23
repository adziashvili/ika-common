import Timer from './timer'
import StringHelper from './stringHelper'
import StringBuffer from './stringBuffer'

// .append('\u2713'.green)

function where(e, inStackIndex = 1) {
  const lines = e.stack.split('\n').slice()

  const title = lines[0]
  const failure = title.slice(title.lastIndexOf(':') + 1).trim()

  const line = lines[1]
  const startIndex = line.lastIndexOf('/')
  const endIndex = line.lastIndexOf(')')
  const location = line.slice(startIndex + inStackIndex, endIndex)
  return `${failure} at ${location}`
}

class Test {
  constructor(msg, func) {
    this.msg = msg
    this.func = func
    this.pass = undefined
    this.indent = 1
    this.whereFailed = ''
  }

  report(index) {
    const sb = new StringBuffer()
    sb
      .appendTimes(' ', this.indent)
      .appendExact(`${index + 1})`, 4)
      .appendExact(this.pass ? 'Pass'.green : 'Fail'.red, 5)
      .appendExact(`${this.ms}ms`, 7)
      .appendExact(this.msg.italic, 43)
      .append(this.whereFailed)
    console.log(sb.toString())
  }

  run(index = '') {
    const timer = new Timer()
    timer.start(this.msg)
    try {
      this.func()
      this.pass = true
    } catch (e) {
      this.whereFailed = `${where(e).red}`
      this.pass = false
    }
    this.ms = timer.finish(this.msg).ms
    this.report(index)
    return this.pass
  }
}

export default class TestSuite {
  static runTestSuites(testSuites = []) {
    const testSetCount = testSuites.length
    let testSetsPassed = 0
    let testCount = 0
    let testsPassed = 0
    let ms = 0

    testSuites.forEach((ts) => {
      const testSuite = ts()
      ms += testSuite.ms
      testCount += testSuite.tests.length
      testsPassed += testSuite.passCount
      if (testSuite.passCount === testSuite.tests.length) {
        testSetsPassed += 1
      }
    })

    console.log('\n', 'TEST REPORT'.bold.underline)

    const testSetPassRatio = (testSetsPassed / testSetCount * 100).toFixed(0)
    const modulesTitle = StringHelper.exact('Modules:', 10)
    console.log(` ${modulesTitle} Pass ${testSetsPassed}/${testSetCount} (${testSetPassRatio}%)`)

    const testPassRatio = (testsPassed / testCount * 100).toFixed(0)
    const testsTitle = StringHelper.exact('Tests:', 10)
    console.log(` ${testsTitle} Pass ${testsPassed}/${testCount} (${testPassRatio}%)`)

    console.log(` ${StringHelper.exact('Duration:', 10)} ${ms}ms`);
  }

  constructor(name) {
    this.name = name
    this.tests = []
    this.passCount = 0
    this.ms = 0
  }

  add(name, func) {
    this.tests.push(new Test(name, func))
  }

  get passRatio() {
    return (this.passCount / this.tests.length * 100).toFixed(0) * 1
  }

  run() {
    console.log((`\n ${this.name}`).bold)
    this.passCount = 0
    this.ms = 0

    this.tests.forEach((t, i) => {
      if (t.run(i)) {
        this.passCount += 1
      }
      this.ms += t.ms
    })

    console.log(' - - -'.grey)
    const msg =
      ` Total: ${this.ms}ms ${this.passCount}/${this.tests.length} (${this.passRatio}%)`
    console.log(this.passRatio < 100 ? msg.red : msg.green)
    return this
  }
}
