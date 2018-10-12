import { Message } from 'discord.js'

import ConfigManager from '../configManager'
import AbstractCommand from './abstractCommand'
import isAdmin from '../../utilities/isAdmin'

/**
 * MessageCommand
 *
 * Base class for Discord.Clients 'message' event
 */
export default class MessageCommand extends AbstractCommand {
  /**
   * Message from the 'message' event
   */
  public message: Message

  /**
   * Name of the command
   */
  public commandName: string = 'message-event'

  /**
   * Event type of the command
   */
  public event: string = 'message'

  /**
   * Enables a check if '!{commandName}' is required in front of a message for this command
   */
  public requireCommandPrefix: boolean = false

  /**
   * Enables a check that requires the user to trigger the event to be an admin
   */
  public requireAdmin: boolean = false

  /**
   * Constructor
   *
   * @param {any[]} args - array from arguments from discord.js event
   * @param {ConfigManager} config - ConfigManager instance
   */
  constructor(args: any[], config: ConfigManager) {
    super(args, config)

    this.message = args[0]
  }

  /**
   * Wrapping function for command()
   *
   * Handles `requireCommandPrefix`, `requireAdmin` and `commandName` option
   */
  execute() {
    let messageArguments = null

    if (this.requireCommandPrefix) {
      if (
        !this.message.content.startsWith(this.config.get('prefix')) ||
        this.message.author.bot
      ) {
        return false
      }

      messageArguments = this.message.content
        .slice(this.config.get('prefix').length)
        .split(/ +/)
      const commandName = messageArguments.shift()!.toLowerCase()

      if (this.commandName === commandName) {
        if (this.requireAdmin) {
          isAdmin(this.message.author.id).then(result => {
            if (result) {
              this.command()
            }
          })
        } else {
          this.command()
        }
      }
    } else {
      if (this.requireAdmin) {
        isAdmin(this.message.author.id).then(result => {
          if (result) {
            this.command()
          }
        })
      } else {
        this.command()
      }
    }
  }

  /**
   * Code relevant to commands, which needs to be written in
   * extended classes from this one
   */
  command() {}
}
