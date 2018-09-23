const AbstractCommand = require('./abstractCommand')

module.exports = class RoleUpdateCommand extends AbstractCommand {
  constructor (args, config) {
    super(args, config)

    this.oldRole = args[0]
    this.newRole = args[1]
  }

  static event () {
    return 'roleUpdate'
  }

  static name () {
    return 'role-update-event'
  }
}
