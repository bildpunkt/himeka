const ConfigManager = require('./src/lib/configManager')
const CLIManager = require('./src/lib/cliManager')
const Himeka = require('./src/himeka')

const cli = new CLIManager()
const config = new ConfigManager(cli.flags['config'])
const himeka = new Himeka(config)

himeka.run()
