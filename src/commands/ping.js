module.exports = {
  name: 'ping',
  description: 'Ping!',
  event: 'message',
  execute(args, config) {
      const message = args[0]
      
      message.channel.send('Pong.');
  },
};