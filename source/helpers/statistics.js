import { MathHelper } from '.'

const DICTIONARY = [
  { key: 'countTotal', shortName: 'Count' },
  { key: 'countDistinct', shortName: 'Count (distinct)' },
  { key: 'countNonEmpty', shortName: 'Count (non empty)' },
  { key: 'sum', shortName: 'Sum', isTypeSensitive: true },
  { key: 'avg', shortName: 'Average', isTypeSensitive: true },
  { key: 'min', shortName: 'Minimum', isTypeSensitive: true },
  { key: 'max', shortName: 'Maximum', isTypeSensitive: true },
  { key: 'avgNonEmpty', shortName: 'Average (non empty)', isTypeSensitive: true },
  { key: 'maxStringLength', shortName: 'Max characters' },
  { key: 'minStringLength', shortName: 'Min characters' }
]

/**
 * When evaluating values, these values will be evaluated to:
 * 0 when evaluating booleans
 * 0 when evaluating numbers
 *
 * Logically, this list of values are considred to be empyty.
 *
 * @type {Array}
 */
const TREAT_AS_ZERO = [0, null, '', '-']

export default class Statistics {
  constructor(zeros = TREAT_AS_ZERO) {
    this.ZERO_VALUES = zeros
  }

  static get ZERO_VALUES() {
    return TREAT_AS_ZERO
  }

  static dictionary() {
    return DICTIONARY
  }

  static typeSensitiveStats() {
    return Statistics.dictionary.map((m) => {
      if (!!m.isTypeSensitive && m.isTypeSensitive) {
        return m.key
      }
      return undefined
    }).filter(item => !!item)
  }

  static getDefaultStatKey(type) {
    switch (type) {
      case 'number':
      case 'currency':
      case 'percent':
        return 'sum'
      case 'string':
      case 'boolean':
      case 'date':
      default:
        return 'countTotal'
    }
  }

  numbers(values) {
    const tmpValues = values.map((v) => {
      if (this.ZERO_VALUES.includes(v)) {
        return 0
      }
      return v
    })
    const stats = this.strings(tmpValues)
    Object.assign(stats, this.numerics(tmpValues))
    return stats
  }

  dates(values) {
    const vNums = values.map(v => v.valueOf())
    const stats = this.numbers(vNums)

    delete stats.sum
    delete stats.avg
    delete stats.avgNonEmpty

    stats.min = new Date(stats.min)
    stats.max = new Date(stats.max)

    return stats
  }

  booleans(values) {
    const bNums = values.map((v) => {
      if (this.ZERO_VALUES.includes(v)) {
        return 0
      }
      return v * 1
    })

    return this.numbers(bNums)
  }

  strings(values) {
    const stats = {}
    stats.countTotal = values.length
    stats.countDistinct = this.distinct(values).count
    stats.countNonEmpty = this.nonEmpty(values).count
    const lengths = values.map(v => `${v}`.length)
    stats.maxStringLength = Math.max(...lengths)
    stats.minStringLength = Math.min(...lengths)
    return stats
  }

  numerics(values) {
    let sum = 0
    let avg = 0
    let avgNonEmpty = 0
    let min = values[0]
    let max = values[0]
    const nonEmpty = this.nonEmpty(values)

    values.forEach((v) => {
      sum += v
      min = v < min ? v : min
      max = v > min ? v : max
    })

    avg = MathHelper.devide(sum, values.length)
    avgNonEmpty = MathHelper.devide(sum, nonEmpty.count)

    return {
      sum: sum.toFixed(2),
      avg,
      avgNonEmpty,
      min,
      max
    }
  }

  distinct(values) {
    const distinct = []
    values.forEach((s) => {
      if (!distinct.includes(s)) { distinct.push(s) }
    })
    return { count: distinct.length, values: distinct }
  }

  nonEmpty(values) {
    const nonEmpty = values.filter(v => !this.ZERO_VALUES.includes(v))
    return {
      count: nonEmpty.length,
      values: nonEmpty
    }
  }
}
