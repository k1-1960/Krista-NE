const config = require('./config');

require('./mongodb')(config.keys.MongoDB);

const Client = require("./estructuras/client");
const Logger = require("./util/logger");
const client = new Client();
const colors = require('colors');

const {
  Collection
} = require ('discord.js');


client.login(config.discord.TOKEN, () => {
  console.log('>>'.bgGreen.black, 'Preparando recursos del bot.');
  require(process.cwd() + '/src/handlers/distube')(client);
  require(process.cwd() + '/src/handlers/comandos')(client);
  require(process.cwd() + '/src/handlers/eventos')(client);
});