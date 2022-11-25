const colors = require('colors');

module.exports = {
  name: 'ready',
  async run (client) {
    console.log('>>'.bgGreen.black, `Conectado como ${client.user.tag}`);
  }
};