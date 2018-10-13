import MessageCommand from '../lib/commands/messageCommand'
import DatabaseManager from '../lib/databaseManager'

const database = new DatabaseManager()
const { Command } = database.models

export default class EnableCommand extends MessageCommand {
  constructor(args, config) {
    super(args, config)

    this.requireCommandPrefix = true
    this.requireAdmin = true
    this.commandName = 'enable'
  }

  static commandName() {
    return 'enable'
  }

  command() {
    const messageArguments = this.message.content
      .slice(this.config.get('prefix').length)
      .split(/ +/)
    const cmdName = messageArguments[1]

    Command.findOne({ where: { name: cmdName } })
      .then(command => {
        if (command === null) {
          this.message.channel.send('Command does not exist!')
          throw new Error()
        }

        if (command.enabled === true) {
          this.message.channel.send('Command is already enabled!')
          throw new Error()
        }

        command
          .updateAttributes({
            enabled: true
          })
          .then(() => {
            this.message.channel.send(`Command \`${cmdName}\` is now enabled!`)
          })
      })
      .catch(Error, () => {})
  }
}
