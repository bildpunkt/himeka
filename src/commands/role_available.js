const MessageCommand = require('../lib/commands/messageCommand')

const DatabaseManager = require('../lib/databaseManager')
const database = new DatabaseManager()
const Role = database.models.Role

module.exports = class RoleAvailableCommand extends MessageCommand {
  constructor (args, config) {
    super(args, config)

    this.requireCommandPrefix = true
    this.commandName = 'available-roles'
  }

  static name () {
    return 'available-roles'
  }

  command () {
    Role.findAll({ where: { whitelisted: true } })
      .then(roles => {
        if (roles.length === 0) {
          this.message.channel.send(
            'There are currently no roles available for self-assigning!'
          )
          throw new Error()
        }
        let msg = 'Following roles are available for self-assigning:\n```\n'

        roles.forEach(role => {
          msg += role.name + '\n'
        })

        msg += '```'

        this.message.channel.send(msg)
      })
      .catch(Error, () => {})
  }
}
