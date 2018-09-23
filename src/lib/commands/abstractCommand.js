module.exports = class AbstractCommand {
  constructor (args, config) {
    this.config = config

    this.arguments = args
  }

  static name () {
    return 'abstract-command'
  }

  static event () {
    throw Error('TODO: Not implemented')
  }

  execute () {
    this.command()
  }

  command () {
    throw new Error('TODO: Not implemented')
  }
}