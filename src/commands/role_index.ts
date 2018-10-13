import MessageCommand from '../lib/commands/messageCommand'
import DatabaseManager from '../lib/databaseManager'
import ConfigManager from '../lib/configManager'

const database = new DatabaseManager()
const { Role } = database.models

export default class RoleIndexCommand extends MessageCommand {
  constructor(args: any[], config: ConfigManager) {
    super(args, config)

    this.requireCommandPrefix = true
    this.requireAdmin = true
    this.commandName = 'index-roles'
  }

  static commandName() {
    return 'index-roles'
  }

  command() {
    this.message.guild.roles.array().forEach(role => {
      Role.findOrCreate({
        where: {
          name: role.name,
          snowflake: role.id,
          whitelisted: false
        }
      }).catch(Error, e => {
        console.log(e)
      })
    })
  }
}
