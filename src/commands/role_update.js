const RoleUpdateCommand = require('../lib/commands/roleUpdateCommand')

const DatabaseManager = require('../lib/databaseManager').default
const database = new DatabaseManager()
const Role = database.models.Role

module.exports = class RoleUpdateEventCommand extends RoleUpdateCommand {
  static name () {
    return 'role-update-event'
  }

  command () {
    Role.findOne({
      where: {
        name: this.oldRole.name,
        snowflake: this.oldRole.id
      }
    })
      .then(role => {
        role.updateAttributes({
          name: this.newRole.name,
          snowflake: this.newRole.id
        })
      })
      .catch(Error, e => {
        console.log(e)
      })
  }
}
