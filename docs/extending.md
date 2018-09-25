# Extending the Bot

## The Basics

Commands follow this structure:

```js
const MessageCommand = require("../lib/commands/messageCommand");

module.exports = class PingCommand extends MessageCommand {
  constructor(args, config) {
    super(args, config);

    this.requireAdmin = true;
  }

  static name() {
    return "ping";
  }

  command() {
    if (this.message.content === "ping") {
      this.message.channel.send("pong");
    }
  }
};
```

Every command needs to extend from a base command, here in this example, we are using `MessageCommand` as a base, which you can find in `src/lib/commands/messageCommand.js`. In the same folder you can also find all the other command base classes that currently exist.

The naming of command base classes follows their event they act on for the `Discord.Client` events, so `MessageCommand` will be executed upon a `message` event.

So, let's take a look at different parts of the above example:

```js
const MessageCommand = require("../lib/commands/messageCommand");
```

In the first line we just require the base class for the command, here it's the `MessageCommand`.

```js
module.exports = class PingCommand extends MessageCommand {
  // .. code here
};
```

Next is our export, which is our new command class, we give it a nice name, preferable ending in `Command` and extend it from our base class.

```js
constructor(args, config) {
  super(args, config);

  this.requireAdmin = true;
}
```

The constructor gets passed two arguments, `args` and `config`. In general, you don't need to use these for your own command, but they are required for the main constructor, as they are passed to that with the `super` function call.

Below the constructor call you see us setting the option `this.requireAdmin`. This option is defined in `MessageCommand` and we are overriding it here to set that this command can only be run by administrators. These options are used for conditions and extra functions run in the `execute()` function, so that you don't have to include them in your command.

```js
static name () {
  return 'ping'
}
```

This static call just defines the name of the command. It needs to be a static function call because JavaScript classes don't have static properties you can define outside of the constructor.

```js
command() {
  if (this.message.content === "ping") {
    this.message.channel.send("pong");
  }
}
```

Last but not least, we have the `command()` function. This is the main code of the command that is executed and here you define what your command does. In the case of `MessageCommand`s you have access to the `this.message` property (derived from `args[0]`), which contains the message data from the `Discord.Client` event.

## Core Commands

If you want to add some new core functionality to Himeka, you can do so in `src/commands/`. In this folder you find all commands that are supplied by Himeka from the start.

## Additional Commands

You also can add commands without touching the source folders at all, for this, simply set the `additionalCommands.enabled` option in `config/himeka.json` to `true` and define a location for your own commands.

Inside that location, just code commands that follow the same format as any other command and run the bot, it should properly index them from your preset location!
