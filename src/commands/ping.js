module.exports = {
  name: 'ping',
  description: 'Ping!',
  event: 'message',
  execute(args, config, database) {
    const message = args[0]
    
    if (message.content === 'ping') {
      message.channel.send('pong')
    }
  },
};