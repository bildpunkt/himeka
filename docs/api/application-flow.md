# Application Flow

## Entrypoint (`index.js`)

This is the file called by `npm start`.

Here we create different instances of manager classes, namely the `CLIManager` and the `ConfigManager`.

The `CLIManager` (`src/lib/cliManager.js`) uses [meow](https://github.com/sindresorhus/meow) to
handle CLI inputs and flags, like the `--add-admin` and `--config` option.

The `ConfigManager` (`src/lib/configManager.js`) is a simple managing utility for the configuration
of himeka. We'll use this instance across the whole bot, down into
commands.

The created `ConfigManager` instance is then passed on to the main class of the bot, `Himeka`.

## Main Class (`src/himeka.js`)

The `ConfigManager` we passed along will be set in a new instance of `Himeka`.

Here we will also create an instance of `Discord.Client` from the [discord.js](https://discord.js.org/) library for our bot functionality. We'll pass this to classes that want to execute Discord functions and also use it to start our bot once everything is set up.

Next, there's the `DatabaseManager` (`src/lib/databaseManager.js`). This managing class is built using [Sequelize](https://github.com/sequelize/sequelize) and contains the Sequelize library, a initialized Sequelize instance and all our model definitions.

Last, but not least, we have our `CommandManager` (`src/lib/commandManager.js`) which collects all commands and additional commands, as well as setting up all required event handlers.

Once all instances have been set up, a call of the `run()` function of Himeka will start the bot.
