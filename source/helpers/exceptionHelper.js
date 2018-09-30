export default class ExceptionHelper {
  static where(e, inStackIndex = 1) {
    const lines = e.stack.split('\n').slice()

    const title = lines[0]
    const failure = title.slice(title.lastIndexOf(':') + 1).trim()

    const line = lines[1]
    const startIndex = line.lastIndexOf('/')
    const endIndex = line.lastIndexOf(')')
    const location = line.slice(startIndex + inStackIndex, endIndex)
    return `${failure} at ${location}`
  }
}
