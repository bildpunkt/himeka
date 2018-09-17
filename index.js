const meow = require('meow')
const ConfigManager = require('./src/lib/configManager')

const cli = meow(
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
      }
    }
  }
)

const config = new ConfigManager(cli.flags['config'])