import MessageCommand from '../lib/commands/messageCommand'
import DatabaseManager from '../lib/databaseManager'
import ConfigManager from '../lib/configManager'

const database = new DatabaseManager()
const { Role } = database.models

export default class RoleAvailableCommand extends MessageCommand {
  constructor(args: any[], config: ConfigManager) {
    super(args, config)

    this.requireCommandPrefix = true
    this.commandName = 'available-roles'
  }

  static commandName() {
    return 'available-roles'
  }

  static commandDescription() {
    return 'Lists all roles which allow self-assigning'
  }

  command() {
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
