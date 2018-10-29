import MessageCommand from '../lib/commands/messageCommand'
import ConfigManager from '../lib/configManager'

export default class PingCommand extends MessageCommand {
  constructor(args: any[], config: ConfigManager) {
    super(args, config)

    this.requireAdmin = false
    this.requireCommandPrefix = false
    this.commandName = 'ping'
  }

  static commandName() {
    return 'ping'
  }

  static commandDescription() {
    return 'Responds with pong. Useful for checking if the bot is responding to commands'
  }

  command() {
    if (this.message.content === 'ping') {
      this.message.channel.send('pong')
    }
  }
}
