import StringHelper from './stringHelper'

/**
 * A utility class allowing multiple time taking.
 * Call start(key) to register a timer.
 * Call finish (key) to take time and print duration.
 *
 * You can start multiple times one after the other.
 *
 * @param  {String} [name='']   A friendly name printed with summerise
 * @return {function}           Return a function class
 */
export default class Timer {
  constructor(name = '', trace = false) {
    this.timers = {}
    this.name = name
    this.trace = trace
  }

  /**
   * Starts a new timer with a given name
   *
   * @param  {String} activity  Optional. An Identifier to the timer.
   *                            When ommitted the Date.now() is used as actvity name
   * @return {void}             Does not return value
   */
  start(activity) {
    const startMS = Date.now()
    const name = !activity ? `${startMS}` : activity

    if (Object.keys(this.timers).includes(name)) {
      throw new Error(`'${name}' key taken`)
    }

    this.timers[name] = {
      timer: name,
      start: startMS
    }

    if (this.trace) {
      console.log('Started timer %s'.red, name);
    }
  }

  /**
   * Marks the end of an activity.
   * At this point duration is calculated.
   *
   * @param  {String} activity  Identifer provided with start
   * @return {void}             Return the timer object. See report
   */
  finish(activity) {
    const finishMS = Date.now()

    if (!Object.keys(this.timers).includes(activity)) {
      console.error('\'%s\' timer not found'.red, activity)
      return { ms: -1 }
    }

    const activityObj = this.timers[activity]
    activityObj.finish = finishMS
    activityObj.ms = finishMS - activityObj.start

    if (this.trace) {
      console.log('Finished timer %s'.red, activity);
      this.report(activity)
    }

    return this.timers[activity]
  }

  /**
   * Prints all times so far
   *
   * @param  {Boolean} isToReset=false If true, removes all timers after summary is printed. Defaults to false
   *
   * @return {void} No return value
   */
  summerise(isToReset = false) {
    if (this.name === '') {
      console.log('\nTimers log:'.cyan);
    } else {
      console.log('\n%s timers log:'.cyan, this.name);
    }

    for (const timer of Object.keys(this.timers)) {
      this.report(timer)
    }

    process.stdout.write('\n')

    if (isToReset) {
      this.timers = {}
    }
  }

  /**
   * Prints a timer status.
   *
   * @param  {[type]} activity [description]
   * @return {Object}          A timer status object that includes:
   *                           name, start (in ms), finish (in ms), duration
   */
  report(activity) {
    const ms = this.timers[activity].ms
    const sec = ms / 1000
    const min = sec / 60
    const hh = min / 60

    const time = {}

    if (hh >= 1) {
      time.val = hh.toFixed(2)
      time.unit = 'h (!!!)'
    } else if (min >= 1) {
      time.val = min.toFixed(2)
      time.unit = 'm (!)'
    } else {
      time.val = ms
      time.unit = 'ms'
    }

    console.log(
      '\t=> %s [%s]'.grey,
      StringHelper.exact(`${time.val} ${time.unit} `, 20, '.'),
      this.timers[activity].timer
    )
    return this.timers[activity]
  }
}
