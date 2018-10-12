import RoleUpdateCommand from '../lib/commands/roleUpdateCommand'
import DatabaseManager from '../lib/databaseManager'

const database = new DatabaseManager()
const { Role } = database.models

export default class RoleUpdateEventCommand extends RoleUpdateCommand {
  constructor(args, config) {
    super(args, config)

    this.commandName = 'role-update-event'
  }

  command() {
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
