import { Role } from 'discord.js'

import ConfigManager from '../configManager'
import AbstractCommand from './abstractCommand'

/**
 * RoleUpdateCommand
 *
 * Base class for Discord.Clients 'roleUpdate' event
 */
export default class RoleUpdateCommand extends AbstractCommand {
  public oldRole: Role
  public newRole: Role

  /**
   * Constructor
   *
   * @param {array} args - array from arguments from discord.js event
   * @param {ConfigManager} config - ConfigManager instance
   *
   * @inner {Role} oldRole - role before update
   * @inner {Role} newRole - role after update
   */
  constructor(args: any[], config: ConfigManager) {
    super(args, config)

    this.oldRole = args[0]
    this.newRole = args[1]
  }

  /**
   * Name of the command
   */
  public commandName: string = 'role-update-event'

  /**
   * Event type of the command
   */
  public static event: string = 'roleUpdate'
}
