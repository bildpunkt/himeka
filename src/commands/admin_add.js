const MessageCommand = require('../lib/commands/messageCommand')

const DatabaseManager = require('../lib/databaseManager')
const database = new DatabaseManager()
const Admin = database.models.Admin

module.exports = class AddAdminCommand extends MessageCommand {
  constructor (args, config) {
    super(args, config)

    this.requireCommandPrefix = true
    this.requireAdmin = true
    this.commandName = 'add-admin'
  }

  static name () {
    return 'add-admin'
  }

  command () {
    const messageArguments = this.message.content.slice(this.config.get('prefix').length).split(/ +/)
    const userID = messageArguments[1]

    Admin
      .findOne({ where: { snowflake: userID } })
      .then((admin) => {
        if (admin !== null) {
          this.message.channel.send('User is already an admin!')
          throw new Error()
        }

        Admin.create({ snowflake: userID })
          .then(() => {
            this.message.channel.send(`User with ID ${userID} is now an admin!`)
          })
      }).catch(Error, () => {})
  }
}