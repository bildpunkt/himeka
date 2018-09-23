const MessageCommand = require('../lib/commands/messageCommand')

module.exports = class PingCommand extends MessageCommand {
  constructor (args, config) {
    super(args, config)

    this.requireAdmin = true
  }

  static name () {
    return 'ping'
  }

  command () {
    if (this.message.content === 'ping') {
      this.message.channel.send('pong')
    }
  }
}