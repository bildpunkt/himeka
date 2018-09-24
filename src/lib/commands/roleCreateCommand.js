const AbstractCommand = require('./abstractCommand')

/**
 * RoleCreateCommand
 *
 * Base class for Discord.Clients 'roleCreate' event
 */
module.exports = class RoleCreateCommand extends AbstractCommand {
  /**
   * Constructor
   *
   * @param {array} args - array from arguments from discord.js event
   * @param {ConfigManager} config - ConfigManager instance
   *
   * @inner {Role} role - created role
   */
  constructor (args, config) {
    super(args, config)

    this.role = args[0]
  }

  /**
   * Name of the command
   */
  static name () {
    return 'role-create-event'
  }

  /**
   * Event type of the command
   */
  static event () {
    return 'roleCreate'
  }
}
