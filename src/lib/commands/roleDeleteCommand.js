const AbstractCommand = require('./abstractCommand')

module.exports = class RoleDeleteCommand extends AbstractCommand {
  constructor (args, config) {
    super(args, config)

    this.role = args[0]
  }

  static event () {
    return 'roleDelete'
  }

  static name () {
    return 'role-delete-event'
  }
}
