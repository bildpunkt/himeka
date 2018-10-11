import ConfigManager from '../configManager'

/**
 * AbstractCommand
 *
 * Base class for all commands
 */
abstract class AbstractCommand {
  /**
   * Constructor
   */
  constructor (protected args: any[], protected config: ConfigManager) {}

  /**
   * Name of the command
   */
  public commandName: string = 'abstract-command'

  /**
   * Event type of the command
   * https://discord.js.org/#/docs/main/stable/class/Client
   */
  public static event: string = 'TODO: Not implemented'

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

export default AbstractCommand
