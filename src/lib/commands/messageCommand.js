const AbstractCommand = require('./abstractCommand')
const isAdmin = require('../../utilities/isAdmin')

module.exports = class MessageCommand extends AbstractCommand {
  constructor (args, config) {
    super(args, config)

    this.message = args[0]
    
    this.requireCommandPrefix = false
    this.commandName = null

    this.requireAdmin = false
  }

  static name () {
    return 'message-event'
  }

  static event () {
    return 'message'
  }

  execute () {
    let messageArguments = null

    if (this.requireCommandPrefix) {
      if (!this.message.content.startsWith(this.config.get('prefix')) || this.message.author.bot) return false

      messageArguments = this.message.content.slice(this.config.get('prefix').length).split(/ +/)
      const commandName = messageArguments.shift().toLowerCase()
      
      if (this.commandName === commandName) {
        if (this.requireAdmin) {
          isAdmin(this.message.author.id).then((result) => {
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
        isAdmin(this.message.author.id).then((result) => {
          if (result) {
            this.command()
          }
        })
      } else {
        this.command()
      }
    }
  }

  command () {

  }
}