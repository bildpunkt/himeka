const MessageCommand = require('../lib/commands/messageCommand')

const DatabaseManager = require('../lib/databaseManager').default
const database = new DatabaseManager()
const Admin = database.models.Admin

module.exports = class RemoveAdminCommand extends MessageCommand {
  constructor (args, config) {
    super(args, config)

    this.requireCommandPrefix = true
    this.requireAdmin = true
    this.commandName = 'remove-admin'
  }

  static name () {
    return 'remove-admin'
  }

  command () {
    const messageArguments = this.message.content
      .slice(this.config.get('prefix').length)
      .split(/ +/)
    const userID = messageArguments[1]

    Admin.findOne({ where: { snowflake: userID } })
      .then(admin => {
        if (admin === null) {
          this.message.channel.send('User is not an admin!')
          throw new Error()
        }

        Admin.destroy({ where: { snowflake: userID } }).then(() => {
          this.message.channel.send(
            `Admin rights revoked for user with ID ${userID}!`
          )
        })
      })
      .catch(Error, () => {})
  }
}
