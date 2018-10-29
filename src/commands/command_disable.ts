import MessageCommand from '../lib/commands/messageCommand'
import DatabaseManager from '../lib/databaseManager'
import ConfigManager from '../lib/configManager'

const database = new DatabaseManager()
const { Command } = database.models

const DISABLE_BLACKLIST = ['enable', 'disable']

export default class DisableCommand extends MessageCommand {
  constructor(args: any[], config: ConfigManager) {
    super(args, config)

    this.requireCommandPrefix = true
    this.requireAdmin = true
    this.commandName = 'disable'
  }

  static commandName() {
    return 'disable'
  }

  static commandDescription() {
    return 'Disables a command'
  }

  command() {
    const messageArguments = this.message.content
      .slice(this.config.get('prefix').length)
      .split(/ +/)
    const cmdName = messageArguments[1]

    if (DISABLE_BLACKLIST.includes(cmdName)) {
      this.message.channel.send(`You can't disable this command, nice try!`)
      return false
    }

    Command.findOne({ where: { name: cmdName } })
      .then(command => {
        if (command === null) {
          this.message.channel.send('Command does not exist!')
          throw new Error()
        }

        if (command.enabled === false) {
          this.message.channel.send('Command is already disabled!')
          throw new Error()
        }

        command
          .updateAttributes({
            enabled: false
          })
          .then(() => {
            this.message.channel.send(`Command \`${cmdName}\` is now disabled!`)
          })
      })
      .catch(Error, () => {})
  }
}
