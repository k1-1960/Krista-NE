const colors = require('colors');

module.exports = {
  name: 'ready',
  async run (client) {
    console.log('<client>'.blue, `Logged as ${client.user.tag}`);
  }
};