import { readdirSync } from 'fs'
import { join } from 'path'
import * as Sequelize from 'sequelize'

const env = process.env.NODE_ENV || 'development'
const config = require(join(__dirname, '../..', '/config/config.json'))[env]

/**
 * DatabaseManager
 *
 * Management utility for database actions
 */
export default class DatabaseManager {
  public sequelize: Sequelize.Sequelize
  public models: Sequelize.ModelsHashInterface

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
        process.env[config.use_env_variable]!,
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
   */
  collectModels () {
    let models: Sequelize.ModelsHashInterface = {}

    readdirSync(join(__dirname, '..', 'database', 'models'))
      .filter(file => {
        return file.indexOf('.') !== 0 && file.slice(-3) === '.js'
      })
      .forEach(file => {
        const model = this.sequelize.import(
          join(__dirname, '..', 'database', 'models', file)
        )
        models[model.name] = model
      })

    Object.keys(models).forEach(modelName => {
      if (models[modelName].associate) {
        models[modelName].associate!(models)
      }
    })

    return models
  }
}
