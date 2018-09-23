import { StringHelper as SH, StringBuffer, TestSuite } from '../helpers'
// const mypkg = require('../..')

const assert = require('assert')

console.clear()

function testStringHelperFRM() {
  // Setup
  const str = 'test'
  const greenStyle = SH.getStyle('ika'.green)

  const ts = new TestSuite('StringHelper')
  ts.add('exact with space', () => assert.equal(SH.exact(str, 5), 'test '))
  ts.add('exact overflow', () => assert.equal(SH.exact('XXXXXXXXXX', 5), 'XX...'))
  ts.add('exact padding with char', () => assert.equal(SH.exact('X', 5, '#', true), '####X'))
  ts.add('exact with null', () => assert.equal(SH.exact(null, 5), 'null '))
  ts.add('exact with undefined', () => assert.equal(SH.exact(undefined, 5), '     '))
  ts.add('exact with styled', () => assert.equal(SH.exact('erel'.red, 5), 'erel '.red))
  ts.add('prefix with space', () => assert.equal(SH.prefix(str, 5), ' test'))
  ts.add('prefix with character', () => assert.equal(SH.prefix(str, 5, '#'), '#test'))
  ts.add('isStyled with null', () => assert.equal(SH.isStyled(null), false))
  ts.add('isStyled with styled', () => assert.equal(SH.isStyled('test'.red), true))
  ts.add('isStyled with non styled', () => assert.equal(SH.isStyled('test'), false))
  ts.add('Apply extracted style', () => assert.equal(SH.applyStyle(str, greenStyle), str.green))
  ts.add('Apply style by example', () => assert.equal(SH.style(str, 'ika'.red), str.red))
  ts.add('parseNumber simple \'1\'', () => assert.equal(SH.parseNumber('1'), 1))
  ts.add('parseNumber undefined', () => assert.equal(SH.parseNumber(undefined), 0))
  ts.add('parseNumber null', () => assert.equal(SH.parseNumber(null), 0))
  ts.add('parseNumber \'null\'', () => assert.equal(SH.parseNumber('null'), 0))
  ts.add('parseNumber empty \'\'', () => assert.equal(SH.parseNumber(''), 0))
  ts.add('parseNumber USD currency \'USD 1.5\'', () => assert.equal(SH.parseNumber('USD 1.5'), 1.5))
  ts.add('parseNumber other currency  \'NIS 1.5\'', () => assert.equal(SH.parseNumber('NIS 1.5'), 1.5))
  ts.add('parseNumber noisy \'#%$1-@.5\'', () => assert.equal(SH.parseNumber('#%$1-@.5'), 1))
  ts.add('parseNumber noisy negative \'-#%$15.3-@.5\'', () => assert.equal(SH.parseNumber('-#%$15.3-@.5'), -15.3))
  ts.add('parseNumber thouhsands \'$1,135.5\'', () => assert.equal(SH.parseNumber('$1,135.5'), 1135.5))
  ts.add('parseNumber big \'$1,135,000,000.5\'', () => assert.equal(SH.parseNumber('$1,135,000,000.5'), 1135000000.5))
  ts.add('parsePercent null', () => assert.equal(SH.parsePercent(null), 0))
  ts.add('parsePercent 0', () => assert.equal(SH.parsePercent(0), 0))
  ts.add('parsePercent \'0\'', () => assert.equal(SH.parsePercent('0'), 0))
  ts.add('parsePercent \'-\'', () => assert.equal(SH.parsePercent('-'), 0))
  ts.add('parsePercent undefined', () => assert.equal(SH.parsePercent(), 0))
  ts.add('parsePercent \'%32\'', () => assert.equal(SH.parsePercent('32%'), 0.32))
  ts.add('parsePercent \'%32\' no scale', () => assert.equal(SH.parsePercent('132%', false), 132))
  ts.add('parsePercent \'32\' no prefix', () => assert.equal(SH.parsePercent('32'), 0.32))
  ts.add('parsePercent \'132\' no prefix, no scale', () => assert.equal(SH.parsePercent('132', false), 132))
  ts.add('parsePercent \'%1%3%2%\' noisy', () => assert.equal(SH.parsePercent('%1%3%2%', false), 132))
  ts.add('parsePercent \'-%1%3%.%2-3%\' negative', () => assert.equal(SH.parsePercent('-%1%3%.%2-3%', false), -13.2))
  ts.add('parseBoolean plain boolean true', () => assert.equal(SH.parseBoolean(true), true))
  ts.add('parseBoolean plain boolean false', () => assert.equal(SH.parseBoolean(false), false))
  ts.add('parseBoolean boolean string \'true\'', () => assert.equal(SH.parseBoolean('true'), true))
  ts.add('parseBoolean \'1\'', () => assert.equal(SH.parseBoolean('1'), true))
  ts.add('parseBoolean \'YEs\'', () => assert.equal(SH.parseBoolean('YEs'), true))
  ts.add('parseBoolean with space \' yes \'', () => assert.equal(SH.parseBoolean(' yes '), true))
  ts.add('parseBoolean \'nonsense\'', () => assert.equal(SH.parseBoolean('nonsense'), false))
  ts.add('parseBoolean capital \'NO\'', () => assert.equal(SH.parseBoolean('NO'), false))
  ts.add('addCommas to 10000000.3234', () => assert.equal(SH.addCommas(1000000.3234), '1,000,000.3234'))
  ts.add('addCommas to -10000000.3234', () => assert.equal(SH.addCommas(-1000000.3234), '-1,000,000.3234'))
  ts.add('addCommas to -500.24', () => assert.equal(SH.addCommas(-500.24), '-500.24'))
  ts.add('addCommas to null', () => assert.equal(SH.addCommas(null), '0'))
  ts.add('addCommas to undefined', () => assert.equal(SH.addCommas(), '0'))
  ts.add('addCommas to well commad \'1,000.00\'', () => assert.equal(SH.addCommas('1,000.00'), '1,000.00'))
  return ts.run()
}

function testStringBufferFRM() {
  const sb = new StringBuffer()
  const strings = ['hello', 'world']
  strings.forEach(str => sb.append(str))
  const ts = new TestSuite('StringBuffer')
  ts.add('toString()', () => assert.equal(sb.toString(), 'helloworld'))
  ts.add('join(space)', () => assert.equal(sb.join(' '), 'hello world'))
  return ts.run()
}

TestSuite.runTestSuites([testStringHelperFRM, testStringBufferFRM])

console.log();
