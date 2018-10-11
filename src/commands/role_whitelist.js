const MessageCommand = require('../lib/commands/messageCommand')

const DatabaseManager = require('../lib/databaseManager').default
const database = new DatabaseManager()
const Role = database.models.Role

module.exports = class RoleWhitelistCommand extends MessageCommand {
  constructor (args, config) {
    super(args, config)

    this.requireCommandPrefix = true
    this.requireAdmin = true
    this.commandName = 'whitelist-role'
  }

  static name () {
    return 'whitelist-role'
  }

  command () {
    const messageArguments = this.message.content
      .slice(this.config.get('prefix').length)
      .split(/ +/)

    messageArguments.shift()
    const roleName = messageArguments.join(' ')

    Role.findOne({ where: { name: roleName } })
      .then(role => {
        if (role === null) {
          this.message.channel.send('Role does not exist!')
          throw new Error()
        }

        if (role.whitelisted === true) {
          this.message.channel.send('Role is already whitelisted!')
          throw new Error()
        }

        role
          .updateAttributes({
            whitelisted: true
          })
          .then(() => {
            this.message.channel.send(
              `Role \`${roleName}\` is now whitelisted!`
            )
          })
      })
      .catch(Error, () => {})
  }
}
