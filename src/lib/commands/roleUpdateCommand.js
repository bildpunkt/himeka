const AbstractCommand = require('./abstractCommand').default

/**
 * RoleUpdateCommand
 *
 * Base class for Discord.Clients 'roleUpdate' event
 */
module.exports = class RoleUpdateCommand extends AbstractCommand {
  /**
   * Constructor
   *
   * @param {array} args - array from arguments from discord.js event
   * @param {ConfigManager} config - ConfigManager instance
   *
   * @inner {Role} oldRole - role before update
   * @inner {Role} newRole - role after update
   */
  constructor (args, config) {
    super(args, config)

    this.oldRole = args[0]
    this.newRole = args[1]
  }

  /**
   * Name of the command
   */
  static name () {
    return 'role-update-event'
  }

  /**
   * Event type of the command
   */
  static event () {
    return 'roleUpdate'
  }
}
