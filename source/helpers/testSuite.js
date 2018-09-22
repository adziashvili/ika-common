import Timer from './timer'

class Test {
  constructor(msg, func) {
    this.msg = msg
    this.func = func
    this.pass = undefined
  }

  run(index = '') {
    const timer = new Timer()
    timer.start(this.msg)
    try {
      this.func()
      this.pass = true
    } catch (e) {
      this.pass = false
    }
    this.ms = timer.finish(this.msg).ms
    const passOrFail = this.pass ? 'Pass'.green : 'Fail'.red
    console.log(` ${index + 1}) ${this.ms}ms ${passOrFail} ${this.msg.italic}`)

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

    console.log('\n', 'TEST REPORT'.bold.underline, `${ms}ms`)

    const testSetPassRatio = (testSetsPassed / testSetCount * 100).toFixed(0)
    console.log(` Modules pass ratio: ${testSetPassRatio}% (${testSetsPassed}/${testSetCount})`)

    const testPassRatio = (testsPassed / testCount * 100).toFixed(0)
    console.log(` Tests pass ratio: ${testPassRatio}% (${testsPassed}/${testCount})`)
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
