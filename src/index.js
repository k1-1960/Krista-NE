const Client = require("./estructuras/client");
const Logger = require("./util/logger");
const client = new Client();
const colors = require('colors');
const config = require('./config');

client.login(config.discord.TOKEN, () => {
  // console.log('<Info> '.blue + 'Procediendo inicio de sesión.');
});