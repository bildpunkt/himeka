const path = require('path')
const fs   = require('fs')

module.exports = class ConfigManager {
  constructor (configPath) {
    this.config = configPath
  }

  set config (configPath) {
    let confPath = path.join(__dirname, '../..', configPath)

    this._config = JSON.parse(fs.readFileSync(confPath, { encoding: 'utf-8' }))
  }

  get config () {
    return this._config
  }

  get (key) {
    return this.config[key]
  }
}