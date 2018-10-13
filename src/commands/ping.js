import MessageCommand from '../lib/commands/messageCommand'

export default class PingCommand extends MessageCommand {
  constructor(args, config) {
    super(args, config)

    this.requireAdmin = false
    this.requireCommandPrefix = false
    this.commandName = 'ping'
  }

  static commandName() {
    return 'ping'
  }

  command() {
    if (this.message.content === 'ping') {
      this.message.channel.send('pong')
    }
  }
}
