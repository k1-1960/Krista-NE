const colors = require('colors');
const config = require(process.cwd() + '/src/config');
module.exports = {
  name: 'messageCreate',
  async run (client, message) {
    config.security.Uppercase(message);
  }
};