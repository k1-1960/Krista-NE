module.exports = {
  message_based: true,
  data: {
    name: 'ping',
    description: 'Pong!'
  },
  async run (client, message, args) {
    message.reply('Pong!');
  }
}