const AbstractCommand = require('./abstractCommand')

/**
 * RoleDeleteCommand
 *
 * Base class for Discord.Clients 'roleDelete' event
 */
module.exports = class RoleDeleteCommand extends AbstractCommand {
  /**
   * Constructor
   *
   * @param {array} args - array from arguments from discord.js event
   * @param {ConfigManager} config - ConfigManager instance
   *
   * @inner {Role} role - deleted role
   */
  constructor (args, config) {
    super(args, config)

    this.role = args[0]
  }

  /**
   * Name of the command
   */
  static name () {
    return 'role-delete-event'
  }

  /**
   * Event type of the command
   */
  static event () {
    return 'roleDelete'
  }
}
