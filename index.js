import ConfigManager from './src/lib/configManager'
import CLIManager from './src/lib/cliManager'
import Himeka from './src/himeka'

const cli = new CLIManager()
const config = new ConfigManager(cli.flags['config'])
const himeka = new Himeka(config)

himeka.run()
