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
    if (this.message.mentions.members.first() !== undefined) {
      const user = this.message.mentions.members.first()
      const userID = user.id

      Admin.findOne({ where: { snowflake: userID } })
        .then(admin => {
          if (admin !== null) {
            this.message.channel.send('User is already an admin!')
            throw new Error()
          }

          Admin.create({ snowflake: userID }).then(() => {
            this.message.channel.send(`${user.toString()} is now an admin!`)
          })
        })
        .catch(Error, () => {})
    }
  }
}
