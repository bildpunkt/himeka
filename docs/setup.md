# Setup

## Prerequisites

- Node.js (stable)
- A Database (MySQL/Postgres/MSSQL)
- A Discord Bot User Token

## Initial Setup

- Clone the repository to the computer/server where you want the bot to run on
- `npm install` the dependencies, and get yourself a coffee
- Install one of the peer dependencies of himeka, which are the database libraries to handle connections to databases. Run  
  `npm install [library] --no-save` and replace `[library]` with:
  - `mysql2` for MySQL
  - `pg` for PostgreSQL
  - `tedious` for MSSQL

## Database Setup

Use your preferred database which is supported by [Sequelize](https://github.com/sequelize/sequelize). I strongly warn you from
using SQLite, because that will have issues with database locking, especially with the `!index-roles` command

To configure the database, just copy the `config/config.example.json` to `config/config.json` and follow the [Sequelize setup guide](http://docs.sequelizejs.com/manual/installation/getting-started.html#setting-up-a-connection).

Once the database is properly configured, run following commands:

```
npm run sequelize -- db:create
npm run sequelize -- db:migrate
```

## Discord Bot Token

The bot needs a face, which is a bot user. To get a bot and a fitting user for it, visit your [Discord Developer Portal](https://discordapp.com/developers/applications/) and create a new application.

After you created your application and gave it a name and description, look for the "Bot" section in the application menu.
Here you can set up your bot user, give it an avatar and a name. Here you'll also find the token section, from which you need
to copy the token.

To configure himeka to use your token, first copy `config/himeka.example.json` to `config/himeka.json`. Then replace the placeholder
token in the configuration file with the token from your bot user, and you are good to go, when you start himeka, it should now act
with your bot user!

**Important Note:** Disable the `Public Bot` option, himeka is a single-server bot!

To add your bot user to a server you need to build an invite URL, which is pretty simple:

```
https://discordapp.com/oauth2/authorize?client_id=[your-bot-id]&scope=bot&permissions=8
```

Replace `[your-bot-id]` with your bots Client ID and open the link in your favorite browser, here you now get the option to add the bot
to a server! For people interested `&permissions=8` grants the bot admin rights on your server, this is to ensure that the bot will have
sufficient rights for any tasks attempted.

## Running the Bot

Once the packages are installed, the database is set up and created/migrated and the bot token is in place, you are ready to go!

_Almost!_ Before you let your bot into the wild (that is your server), you need to set yourself as an administrator for the bot,
otherwise no one will be able to execute any special commands.

To add an admin, you first need your User ID. If you already know it, just keep it for a second, otherwise a short explanation on
how to easily get it:

- Enable **Developer Mode** in the Settings in Discord (Settings > Appearance > Advanced)
- Right-click on yourself in a server list or in a chat and press "Copy ID"

With the ID at hand, we can now run following command in the command line:

```
npm run start -- --add-admin [your-user-id]
```

_And voilà, you're an admin for himeka now!_

Don't worry, you only need to do this once, as an admin you now have access to add admins over Discord using the available commands.

Now that there's at least one admin, everything is set, to run himeka, just execute:

```
npm run start
```

**Note:** Once you close your command prompt, the bot will turn off, so you need to use something like tmux/screen/pm2/forever to keep
the bot running while you don't have the command prompt open, but this is a topic we're not going into here!
