import MessageCommand from '../lib/commands/messageCommand'
import DatabaseManager from '../lib/databaseManager'
import ConfigManager from '../lib/configManager'

const database = new DatabaseManager()
const { Admin } = database.models

export default class RemoveAdminCommand extends MessageCommand {
  constructor(args: any[], config: ConfigManager) {
    super(args, config)

    this.requireCommandPrefix = true
    this.requireAdmin = true
    this.commandName = 'remove-admin'
  }

  static commandName() {
    return 'remove-admin'
  }

  static commandDescription() {
    return 'Removes a user\'s admin privileges'
  }

  command() {
    if (this.message.mentions.members.first() !== undefined) {
      const user = this.message.mentions.members.first()
      const userID = user.id

      Admin.findOne({ where: { snowflake: userID } })
        .then(admin => {
          if (admin === null) {
            this.message.channel.send('User is not an admin!')
            throw new Error()
          }

          Admin.destroy({ where: { snowflake: userID } }).then(() => {
            this.message.channel.send(
              `Admin rights revoked for ${user.toString()}!`
            )
          })
        })
        .catch(Error, () => {})
    }
  }
}
