const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require(path.join(__dirname, '../..', '/config/config.json'))[
  env
]

module.exports = class DatabaseManager {
  constructor () {
    this.Sequelize = Sequelize

    if (config.use_env_variable) {
      this.sequelize = new Sequelize(
        process.env[config.use_env_variable],
        config
      )
    } else {
      this.sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
      )
    }

    this.models = this.collectModels()
  }

  collectModels () {
    let models = {}

    fs.readdirSync(path.join(__dirname, '..', 'database', 'models'))
      .filter(file => {
        return file.indexOf('.') !== 0 && file.slice(-3) === '.js'
      })
      .forEach(file => {
        const model = this.sequelize.import(
          path.join(__dirname, '..', 'database', 'models', file)
        )
        models[model.name] = model
      })

    Object.keys(models).forEach(modelName => {
      if (models[modelName].associate) {
        models[modelName].associate(models)
      }
    })

    return models
  }
}
