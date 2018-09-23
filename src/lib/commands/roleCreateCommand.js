const AbstractCommand = require('./abstractCommand')

module.exports = class RoleCreateCommand extends AbstractCommand {
  constructor (args, config) {
    super(args, config)

    this.role = args[0]
  }

  static event () {
    return 'roleCreate'
  }

  static name () {
    return 'role-create-event'
  }
}
