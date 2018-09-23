const MessageCommand = require('../lib/commands/messageCommand')

const DatabaseManager = require('../lib/databaseManager')
const database = new DatabaseManager()
const Role = database.models.Role

module.exports = class RoleIndexCommand extends MessageCommand {
  constructor (args, config) {
    super(args, config)

    this.requireCommandPrefix = true
    this.requireAdmin = true
    this.commandName = 'index-roles'
  }

  static name () {
    return 'index-roles'
  }

  command () {
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
