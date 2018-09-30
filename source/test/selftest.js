import { StringHelper as SH, StringBuffer, MathHelper as MH } from '../helpers'
import { TestManager, TestSet } from '.'
// const mypkg = require('../..')

const assert = require('assert')

console.clear()

function aeq(a, b) {
  return () => assert.equal(a, b)
}

function mathHelperFactory() {
  const ts = new TestSet('MathHelper')
  ts.add('devide 5 by 2', aeq(MH.devide(5, 2), 5 / 2))
  return ts
}

function stringHelperFactory() {
  // Setup
  const str = 'test'
  const greenStyle = SH.getStyle('ika'.green)

  const ts = new TestSet('StringHelper')
  ts.add('exact with space', aeq(SH.exact(str, 5), 'test '))
  ts.add('exact overflow', aeq(SH.exact('XXXXXXXXXX', 5), 'XX...'))
  ts.add('exact padding with char', aeq(SH.exact('X', 5, '#', true), '####X'))
  ts.add('exact with null', aeq(SH.exact(null, 5), 'null '))
  ts.add('exact with undefined', aeq(SH.exact(undefined, 5), '     '))
  ts.add('exact with styled', aeq(SH.exact('erel'.red, 5), 'erel '.red))
  ts.add('prefix with space', aeq(SH.prefix(str, 5), ' test'))
  ts.add('prefix with character', aeq(SH.prefix(str, 5, '#'), '#test'))
  ts.add('isStyled with null', aeq(SH.isStyled(null), false))
  ts.add('isStyled with styled', aeq(SH.isStyled('test'.red), true))
  ts.add('isStyled with non styled', aeq(SH.isStyled('test'), false))
  ts.add('Apply extracted style', aeq(SH.applyStyle(str, greenStyle), str.green))
  ts.add('Apply style by example', aeq(SH.style(str, 'ika'.red), str.red))
  ts.add('parseNumber simple \'1\'', aeq(SH.parseNumber('1'), 1))
  ts.add('parseNumber undefined', aeq(SH.parseNumber(undefined), 0))
  ts.add('parseNumber null', aeq(SH.parseNumber(null), 0))
  ts.add('parseNumber \'null\'', aeq(SH.parseNumber('null'), 0))
  ts.add('parseNumber empty \'\'', aeq(SH.parseNumber(''), 0))
  ts.add('parseNumber USD currency \'USD 1.5\'', aeq(SH.parseNumber('USD 1.5'), 1.5))
  ts.add('parseNumber other currency  \'NIS 1.5\'', aeq(SH.parseNumber('NIS 1.5'), 1.5))
  ts.add('parseNumber noisy \'#%$1-@.5\'', aeq(SH.parseNumber('#%$1-@.5'), 1))
  ts.add('parseNumber noisy negative \'-#%$15.3-@.5\'', aeq(SH.parseNumber('-#%$15.3-@.5'), -15.3))
  ts.add('parseNumber thouhsands \'$1,135.5\'', aeq(SH.parseNumber('$1,135.5'), 1135.5))
  ts.add('parseNumber big \'$1,135,000,000.5\'', aeq(
    SH.parseNumber('$1,135,000,000.5'), 1135000000.5
  ))
  ts.add('parsePercent null', aeq(SH.parsePercent(null), 0))
  ts.add('parsePercent 0', aeq(SH.parsePercent(0), 0))
  ts.add('parsePercent \'0\'', aeq(SH.parsePercent('0'), 0))
  ts.add('parsePercent \'-\'', aeq(SH.parsePercent('-'), 0))
  ts.add('parsePercent undefined', aeq(SH.parsePercent(), 0))
  ts.add('parsePercent \'%32\'', aeq(SH.parsePercent('32%'), 0.32))
  ts.add('parsePercent \'%32\' no scale', aeq(SH.parsePercent('132%', false), 132))
  ts.add('parsePercent \'32\' no prefix', aeq(SH.parsePercent('32'), 0.32))
  ts.add('parsePercent \'132\' no prefix, no scale', aeq(SH.parsePercent('132', false), 132))
  ts.add('parsePercent \'%1%3%2%\' noisy', aeq(SH.parsePercent('%1%3%2%', false), 132))
  ts.add('parsePercent \'-%1%3%.%2-3%\' negative', aeq(
    SH.parsePercent('-%1%3%.%2-3%', false), -13.2
  ))
  ts.add('parseBoolean plain boolean true', aeq(SH.parseBoolean(true), true))
  ts.add('parseBoolean plain boolean false', aeq(SH.parseBoolean(false), false))
  ts.add('parseBoolean boolean string \'true\'', aeq(SH.parseBoolean('true'), true))
  ts.add('parseBoolean \'1\'', aeq(SH.parseBoolean('1'), true))
  ts.add('parseBoolean \'YEs\'', aeq(SH.parseBoolean('YEs'), true))
  ts.add('parseBoolean with space \' yes \'', aeq(SH.parseBoolean(' yes '), true))
  ts.add('parseBoolean \'nonsense\'', aeq(SH.parseBoolean('nonsense'), false))
  ts.add('parseBoolean capital \'NO\'', aeq(SH.parseBoolean('NO'), false))
  ts.add('addCommas to 10000000.3234', aeq(SH.addCommas(1000000.3234), '1,000,000.3234'))
  ts.add('addCommas to -10000000.3234', aeq(SH.addCommas(-1000000.3234), '-1,000,000.3234'))
  ts.add('addCommas to -500.24', aeq(SH.addCommas(-500.24), '-500.24'))
  ts.add('addCommas to null', aeq(SH.addCommas(null), '0'))
  ts.add('addCommas to undefined', aeq(SH.addCommas(), '0'))
  ts.add('addCommas to well commad \'1,000.00\'', aeq(SH.addCommas('1,000.00'), '1,000.00'))
  return ts
}

function stringBufferFactory() {
  const sb = new StringBuffer()
  const strings = ['hello', 'world']
  strings.forEach(str => sb.append(str))
  const ts = new TestSet('StringBuffer')
  ts.add('toString()', aeq(sb.toString(), 'helloworld'))
  ts.add('join(space)', aeq(sb.join(' '), 'hello world'))
  return ts
}

const isSuccss = TestManager.runTestSets(
  [
    stringHelperFactory,
    stringBufferFactory,
    mathHelperFactory
  ]
)
const msg = `\n Test completed ${isSuccss ? 'successfully' : 'with failure'}\n`
console.log(msg)
