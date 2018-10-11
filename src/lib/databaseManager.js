const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require(path.join(__dirname, '../..', '/config/config.json'))[
  env
]

/**
 * @typedef {import('sequelize').Sequelize} SequelizeInstance
 * @typedef {import('sequelize').ModelsHashInterface} ModelsHashInterface
 */

/**
 * DatabaseManager
 *
 * Management utility for database actions
 */
module.exports = class DatabaseManager {
  /**
   * @constructor
   */
  constructor () {
    if (config.use_env_variable) {
      /**
       * Sequelize instance
       *
       * @type {SequelizeInstance}
       */
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

    /**
     * Object containing model definition
     *
     * @type {ModelsHashInterface}
     */
    this.models = this.collectModels()
  }

  /**
   * Function to collect models from specific folder
   *
   * @returns {ModelsHashInterface} object with model definitions
   */
  collectModels () {
    /** @type {ModelsHashInterface} */
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
