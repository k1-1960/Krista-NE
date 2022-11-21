const Client = require("./estructuras/client");
const Logger = require("./util/logger");
const client = new Client();
const colors = require('colors');
const config = require('./config');

const {
  Collection
} = require ('discord.js');

client.commands = new Collection();

require('./mongodb')(config.keys.MongoDB);

client.login(config.discord.TOKEN, () => {
  console.log('<Info> '.blue + 'Procediendo inicio de sesión.');
  require(process.cwd() + '/src/handlers/distube')(client);
  require(process.cwd() + '/src/handlers/eventos')(client);
  require(process.cwd() + '/src/handlers/comandos')(client);
});