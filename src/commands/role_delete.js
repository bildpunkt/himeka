const RoleDeleteCommand = require('../lib/commands/roleDeleteCommand')

const DatabaseManager = require('../lib/databaseManager').default
const database = new DatabaseManager()
const Role = database.models.Role

module.exports = class RoleDeleteEventCommand extends RoleDeleteCommand {
  static name () {
    return 'role-delete-event'
  }

  command () {
    Role.destroy({
      where: {
        name: this.role.name,
        snowflake: this.role.id
      }
    }).catch(Error, e => {
      console.log(e)
    })
  }
}
