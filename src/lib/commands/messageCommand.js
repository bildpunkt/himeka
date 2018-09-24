const AbstractCommand = require('./abstractCommand')
const isAdmin = require('../../utilities/isAdmin')

/**
 * MessageCommand
 *
 * Base class for Discord.Clients 'message' event
 */
module.exports = class MessageCommand extends AbstractCommand {
  /**
   * Constructor
   *
   * @param {array} args - array from arguments from discord.js event
   * @param {ConfigManager} config - ConfigManager instance
   *
   * @inner {boolean} requireCommandPrefix - if command needs '!cmd'
   * @inner {boolean} requireAdmin - if command requires admin permission
   * @inner {string} commandName - commandName for 'requireCommandPrefix'
   */
  constructor (args, config) {
    super(args, config)

    this.message = args[0]

    this.requireCommandPrefix = false
    this.commandName = null

    this.requireAdmin = false
  }

  /**
   * Name of the command
   */
  static name () {
    return 'message-event'
  }

  /**
   * Event type of the command
   */
  static event () {
    return 'message'
  }

  /**
   * Wrapping function for command()
   *
   * Handles `requireCommandPrefix`, `requireAdmin` and `commandName` option
   */
  execute () {
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
      const commandName = messageArguments.shift().toLowerCase()

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
  command () {}
}
