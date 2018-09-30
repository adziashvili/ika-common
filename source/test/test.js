import {
  StringBuffer,
  Timer,
  ExceptionHelper as EXH
} from '../..'

export default class Test {
  constructor(msg, func) {
    this.msg = msg
    this.func = func
    this.pass = undefined
    this.indent = 1
    this.whereFailed = ''
  }

  run(index = '') {
    const timer = new Timer()
    timer.start(this.msg)
    try {
      this.func()
      this.pass = true
    } catch (e) {
      this.whereFailed = `${EXH.where(e).red}`
      this.pass = false
    }
    this.ms = timer.finish(this.msg).ms
    this.report(index)
    return this.pass
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
}
