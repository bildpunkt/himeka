import MessageCommand from '../lib/commands/messageCommand'
import DatabaseManager from '../lib/databaseManager'
import ConfigManager from '../lib/configManager'

const database = new DatabaseManager()
const { Admin } = database.models

export default class AddAdminCommand extends MessageCommand {
  constructor(args: any[], config: ConfigManager) {
    super(args, config)

    this.requireCommandPrefix = true
    this.requireAdmin = true
    this.commandName = 'add-admin'
  }

  static commandName() {
    return 'add-admin'
  }

  static commandDescription() {
    return 'Grants a user admin rights for the bot'
  }

  command() {
    const messageArguments = this.message.content
      .slice(this.config.get('prefix').length)
      .split(/ +/)
    const userID = messageArguments[1]

    Admin.findOne({ where: { snowflake: userID } })
      .then(admin => {
        if (admin !== null) {
          this.message.channel.send('User is already an admin!')
          throw new Error()
        }

        Admin.create({ snowflake: userID }).then(() => {
          this.message.channel.send(`User with ID ${userID} is now an admin!`)
        })
      })
      .catch(Error, () => {})
  }
}
