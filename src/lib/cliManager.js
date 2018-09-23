const meow = require('meow')
const DatabaseManager = require('./databaseManager')

module.exports = class CLIManager {
  constructor () {
    this.database = new DatabaseManager()

    this.cli = meow(
      `
      Usage:
        $ npm start [-- {options}]
    
      Options:
        --config, -c  Specify a different config path
      `,
      {
        flags: {
          config: {
            type: 'string',
            default: 'config/himeka.json',
            alias: 'c'
          },
          addAdmin: {
            type: 'string'
          }
        }
      }
    )

    Object.assign(this, this.cli)

    this.processCliInput()
  }

  processCliInput () {
    if (this.cli.flags['addAdmin']) {
      const Admin = this.database.models.Admin

      Admin.findOne({
        where: { snowflake: this.cli.flags['addAdmin'] }
      }).then(admin => {
        if (admin !== null) {
          console.log(
            `User ID ${this.cli.flags['addAdmin']} is already an Admin`
          )
          process.exit(1)
        }

        Admin.create({ snowflake: this.cli.flags['addAdmin'] }).then(() => {
          console.log(`User with ID ${this.cli.flags['addAdmin']} set as Admin`)
          process.exit(0)
        })
      })
    }
  }
}
