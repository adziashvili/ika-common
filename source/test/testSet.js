import { Timer } from '../..'
import { Test } from '.'

export default class TestSet {
  constructor(name) {
    this.name = name
    this.tests = []
    this.passCount = 0
    this.ms = 0
  }

  add(msg, func) {
    this.tests.push(new Test(msg, func))
  }

  get passRatio() {
    return (this.passCount / this.tests.length * 100).toFixed(0) * 1
  }

  run() {
    console.log((`\n ${this.name}`).bold)
    this.passCount = 0
    this.ms = 0

    const timer = new Timer()
    timer.start(this.name)

    this.tests.forEach((t, i) => {
      if (t.run(i)) {
        this.passCount += 1
      }
    })
    this.ms = timer.finish(this.name).ms

    this.report()
    return this
  }

  report() {
    console.log(' - - -'.grey)
    const stats = `${this.ms}ms ${this.passCount}/${this.tests.length} (${this.passRatio}%)`
    let msg
    if (this.passCount === this.tests.length) {
      msg = ` ${'\u2713'} ${this.name} passed: ${stats}`
      msg = msg.green
    } else {
      const failCount = this.tests.length - this.passCount
      const mutiple = failCount > 1 ? 's' : ''
      const failedMsg = `, failed ${failCount} test${mutiple}`
      msg = ` ${'!'.bold} ${this.name} failed: ${stats}${failedMsg}`
      msg = msg.red
    }
    console.log(msg);
  }
}
