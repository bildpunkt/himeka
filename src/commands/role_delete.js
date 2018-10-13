import RoleDeleteCommand from '../lib/commands/roleDeleteCommand'
import DatabaseManager from '../lib/databaseManager'

const database = new DatabaseManager()
const { Role } = database.models

export default class RoleDeleteEventCommand extends RoleDeleteCommand {
  constructor(args, config) {
    super(args, config)

    this.commandName = 'role-delete-event'
  }

  static commandName() {
    return 'role-delete-event'
  }

  command() {
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
