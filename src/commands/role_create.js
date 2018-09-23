const RoleCreateCommand = require('../lib/commands/roleCreateCommand')

const DatabaseManager = require('../lib/databaseManager')
const database = new DatabaseManager()
const Role = database.models.Role

module.exports = class RoleCreateEventCommand extends RoleCreateCommand {
  static name () {
    return 'role-create-event'
  }

  command () {
    Role.findOrCreate({
      where: {
        name: this.role.name,
        snowflake: this.role.id,
        whitelisted: false
      }
    }).catch(Error, e => {
      console.log(e)
    })
  }
}
