# Himeka

A multi-purpose and extensible Discord bot written in Node.js

## Features

- Easy-to-extend class based command architecture based on discord.js Client events
- Enabling/Disabling commands from your server
- Limiting command usage to administrators of the bot
- Promoting/Demoting users to administrators from your server
- Allowing users to self-(de)assign roles to them
  - White/Blacklisting of server roles that users can assign themselves
  - Automatic sync of available roles via Discord.js events

## Setup

Setting up the bot is detailed in the documentation, you can find the relevant document [here](docs/setup.md)!

## Guides

- [Extending the Bot](docs/extending.md)
- [Commands](docs/commands.md)

## Known Issues / Planned

- Himeka currently only supports a single server, the database structure doesn't differentiate between different guilds, so using the same bot running Himeka on multiple guilds might cause unwanted issues.

## Contributing

### Reporting Bugs / Issues

If you have any issues with Himeka running on a server, please don't hesitate to [open an issue](/issues/new). Please provide as much detail as you can on your problem, so it can be replicated and fixed as fast as possible!

### Requesting Features / New Functionality

Any idea for a new feature for Himeka that might be valuable for all users? Tell us and [open an issue](/issues/new) to describe your idea! All ideas are welcome, but depending on their scope and size, we might decide against implementing them. If that's the case, you can still implement them for your own bot instance!

### Implementing Features

Found a bug, have a cool idea for something and have the ability to code it yourself? Contributions are always welcome! Just fork the repository, do your changes in a branch and open a Pull Request for this repository, we'll take a look at it, leave feedback and eventually merge it!

## License

Himeka is licensed under the MIT License.
