import { Timer, StringHelper as SH } from '../..'

export default class TestManager {
  static runTestSets(testSetfactories = []) {
    return new TestManager(testSetfactories).run()
  }

  constructor(testSetfactories = []) {
    this.testSets = []
    testSetfactories.forEach(factory => this.testSets.push(factory()))
    this.testSetCount = this.testSets.length
    this.testSetsPassed = 0
    this.testCount = 0
    this.testsPassed = 0
    this.ms = 0
  }

  run() {
    const { testSets } = this
    this.testSetsPassed = 0
    this.testCount = 0
    this.testsPassed = 0
    this.ms = 0

    const timerName = 'tstMgr.run'
    const timer = new Timer()
    timer.start(timerName)

    testSets.forEach((testSet) => {
      testSet.run()
      this.testCount += testSet.tests.length
      this.testsPassed += testSet.passCount
      if (testSet.passCount === testSet.tests.length) {
        this.testSetsPassed += 1
      }
    })
    this.ms = timer.finish(timerName).ms

    this.report()
    return this.testSetCount === this.testSetsPassed
  }

  report() {
    const titleLen = 10
    const zero = 0
    const {
      testSetCount,
      testSetsPassed,
      testCount,
      testsPassed,
      ms
    } = this

    console.log('\n', 'TEST REPORT'.bold)

    let passFail

    const testSetPassRatio = (testSetsPassed / testSetCount * 100).toFixed(zero)
    const modulesTitle = SH.exact('Modules:', titleLen)
    passFail = testSetsPassed === testSetCount ? '\u2713'.green : '!'.red.bold
    console.log(` ${passFail} ${modulesTitle} passed ${testSetsPassed}/${testSetCount} (${testSetPassRatio}%)`)

    const testPassRatio = (testsPassed / testCount * 100).toFixed(zero)
    const testsTitle = SH.exact('Tests:', titleLen)
    passFail = testsPassed === testCount ? '\u2713'.green : '!'.red.bold
    console.log(` ${passFail} ${testsTitle} passed ${testsPassed}/${testCount} (${testPassRatio}%)`)

    console.log(`   ${SH.exact('Duration:', titleLen)} ${ms}ms`)
  }
}
