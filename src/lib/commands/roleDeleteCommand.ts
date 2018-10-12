import { Role } from 'discord.js'
import ConfigManager from '../configManager'
import AbstractCommand from './abstractCommand'

/**
 * RoleDeleteCommand
 *
 * Base class for Discord.Clients 'roleDelete' event
 */
export default class RoleDeleteCommand extends AbstractCommand {
  /**
   * Deleted role
   */
  public role: Role

  /**
   * Constructor
   *
   * @param {array} args - array from arguments from discord.js event
   * @param {ConfigManager} config - ConfigManager instance
   *
   * @inner {Role} role - deleted role
   */
  constructor(args: any[], config: ConfigManager) {
    super(args, config)

    this.role = args[0]
  }

  /**
   * Name of the command
   */
  public commandName: string = 'role-delete-event'

  /**
   * Event type of the command
   */
  public static event: string = 'roleDelete'
}
