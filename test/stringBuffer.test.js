    /* global test expect */
    import { StringBuffer } from '../source'

    const sb = new StringBuffer()
    const strings = ['hello', 'world']
    strings.forEach(str => sb.append(str))

    test('toString()', () => {
      expect(sb.toString()).toBe('helloworld')
    })

    test('join(\' \')', () => {
      expect(sb.join(' ')).toBe('hello world')
    })
