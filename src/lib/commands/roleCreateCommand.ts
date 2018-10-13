import { Role } from 'discord.js'

import ConfigManager from '../configManager'
import AbstractCommand from './abstractCommand'

/**
 * RoleCreateCommand
 *
 * Base class for Discord.Clients 'roleCreate' event
 */
export default class RoleCreateCommand extends AbstractCommand {
  /**
   * Created role
   */
  public role: Role

  /**
   * Constructor
   *
   * @param {array} args - array from arguments from discord.js event
   * @param {ConfigManager} config - ConfigManager instance
   *
   * @inner {Role} role - created role
   */
  constructor(args: any[], config: ConfigManager) {
    super(args, config)

    this.role = args[0]
  }

  /**
   * Name of the command
   */
  static commandName() {
    return 'role-create-event'
  }

  /**
   * Event type of the command
   */
  static event() {
    return 'roleCreate'
  }
}
