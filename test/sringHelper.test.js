    /* global test expect */
    import { StringHelper as SH } from '../source'

    // Setup
    const str = 'test'
    const greenStyle = SH.getStyle('ika'.green)

    test('exact with space', () => {
      expect(SH.exact(str, 5)).toBe('test ')
    })

    test('exact overflow', () => {
      expect(SH.exact('XXXXXXXXXX', 5)).toBe('XX...')
    })

    test('exact padding with char', () => {
      expect(SH.exact('X', 5, '#', true)).toBe('####X')
    })

    test('exact with null', () => {
      expect(SH.exact(null, 5)).toBe('null ')
    })

    test('exact with undefined', () => {
      expect(SH.exact(undefined, 5)).toBe('     ')
    })

    test('exact with styled', () => {
      expect(SH.exact('erel'.red, 5)).toBe('erel '.red)
    })

    test('prefix with space', () => {
      expect(SH.prefix(str, 5)).toBe(' test')
    })

    test('prefix with character', () => {
      expect(SH.prefix(str, 5, '#')).toBe('#test')
    })

    test('isStyled with null', () => {
      expect(SH.isStyled(null)).toBe(false)
    })

    test('isStyled with styled', () => {
      expect(SH.isStyled('some'.red)).toBe(true)
    })

    test('isStyled with non styled', () => {
      expect(SH.isStyled('some')).toBe(false)
    })

    test('Apply extracted style', () => {
      expect(SH.applyStyle(str, greenStyle)).toBe(str.green)
    })

    test('Apply style by example', () => {
      expect(SH.style(str, 'ika'.red)).toBe(str.red)
    })

    test('parseNumber simple \'1\'', () => {
      expect(SH.parseNumber('1')).toBe(1)
    })

    test('parseNumber null', () => {
      expect(SH.parseNumber(null)).toBe(0)
    })

    test('parseNumber \'null\'', () => {
      expect(SH.parseNumber('null')).toBe(0)
    })

    test('parseNumber undefined', () => {
      expect(SH.parseNumber(undefined)).toBe(0)
    })

    test('parseNumber empty', () => {
      expect(SH.parseNumber('')).toBe(0)
    })

    test('parseNumber USD currency', () => {
      expect(SH.parseNumber('USD 1.5')).toBe(1.5)
    })

    test('parseNumber NIS currency', () => {
      expect(SH.parseNumber('NIS 1.5')).toBe(1.5)
    })

    test('parseNumber noisy \'#%$1-@.5\'', () => {
      expect(SH.parseNumber('#%$1-@.5')).toBe(1)
    })

    test('parseNumber noisy negative \'-#%$15.3-@.5\'', () => {
      expect(SH.parseNumber('-#%$15.3-@.5')).toBe(-15.3)
    })

    test('parseNumber thouhsands \'$1,135.5\'', () => {
      expect(SH.parseNumber('$1,135.5')).toBe(1135.5)
    })

    test('parseNumber big \'$1,135,000,000.5\'', () => {
      expect(SH.parseNumber('$1,135,000,000.5')).toBe(1135000000.5)
    })

    test('parsePercent null', () => {
      expect(SH.parsePercent(null)).toBe(0)
    })

    test('parsePercent 0', () => {
      expect(SH.parsePercent(0)).toBe(0)
    })

    test('parsePercent \'0\'', () => {
      expect(SH.parsePercent('0')).toBe(0)
    })

    test('parsePercent \'-\'', () => {
      expect(SH.parsePercent('-')).toBe(0)
    })

    test('parsePercent undefined', () => {
      expect(SH.parsePercent()).toBe(0)
    })

    test('parsePercent \'%32\'', () => {
      expect(SH.parsePercent('32%')).toBe(0.32)
    })

    test('parsePercent \'132%\' no scale', () => {
      expect(SH.parsePercent('132%', false)).toBe(132)
    })

    test('parsePercent \'32\' no scale', () => {
      expect(SH.parsePercent('32', false)).toBe(32)
    })

    test('parsePercent \'132\' no prefix and no scale', () => {
      expect(SH.parsePercent('132', false)).toBe(132)
    })

    test('parsePercent \'%1%3%2%\' noisy', () => {
      expect(SH.parsePercent('%1%3%2%', false)).toBe(132)
    })

    test('parsePercent \'-%1%3%.%2-3%\' negative', () => {
      expect(SH.parsePercent('-%1%3%.%2-3%', false)).toBe(-13.2)
    })

    test('parseBoolean true to true', () => {
      expect(SH.parseBoolean(true)).toBe(true)
    })

    test('parseBoolean \'true\' to true', () => {
      expect(SH.parseBoolean('true')).toBe(true)
    })

    test('parseBoolean \'1\' to true', () => {
      expect(SH.parseBoolean('1')).toBe(true)
    })

    test('parseBoolean \'YEs\' to true', () => {
      expect(SH.parseBoolean('YEs')).toBe(true)
    })

    test('parseBoolean \' yEs \' to true', () => {
      expect(SH.parseBoolean(' yEs ')).toBe(true)
    })

    test('parseBoolean false to false', () => {
      expect(SH.parseBoolean(false)).toBe(false)
    })

    test('parseBoolean \' nO \' to false', () => {
      expect(SH.parseBoolean(' nO ')).toBe(false)
    })

    test('parseBoolean \'nonsense\' to false', () => {
      expect(SH.parseBoolean('nonsense')).toBe(false)
    })

    test('addCommas to 10000000.3234', () => {
      expect(SH.addCommas(1000000.3234)).toBe('1,000,000.3234')
    })

    test('addCommas to negative -10000000.3234', () => {
      expect(SH.addCommas(-1000000.3234)).toBe('-1,000,000.3234')
    })

    test('addCommas to negative -500.24', () => {
      expect(SH.addCommas(-500.24)).toBe('-500.24')
    })

    test('addCommas to null', () => {
      expect(SH.addCommas(null)).toBe('0')
    })

    test('addCommas to undefined', () => {
      expect(SH.addCommas()).toBe('0')
    })

    test('addCommas to well commad \'1,000.00\'', () => {
      expect(SH.addCommas('1,000.00')).toBe('1,000.00')
    })
