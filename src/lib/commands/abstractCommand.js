/**
 * AbstractCommand
 *
 * Base class for all commands
 */
module.exports = class AbstractCommand {
  /**
   * Constructor
   *
   * @param {array} args - array from arguments from discord.js event
   * @param {ConfigManager} config - ConfigManager instance
   */
  constructor (args, config) {
    this.config = config

    this.arguments = args
  }

  /**
   * Name of the command
   */
  static name () {
    return 'abstract-command'
  }

  /**
   * Event type of the command
   * https://discord.js.org/#/docs/main/stable/class/Client
   *
   * @throws Error, if not implemented
   */
  static event () {
    throw Error('TODO: Not implemented')
  }

  /**
   * Wrapping function for command()
   *
   * Put code here that handles superficial stuff users don't
   * need to mess with
   */
  execute () {
    this.command()
  }

  /**
   * Code relevant to commands, which needs to be written in
   * extended classes from this one
   */
  command () {
    throw new Error('TODO: Not implemented')
  }
}
