require("dotenv").config();
const {
  readdirSync
} = require('fs');
const colors = require('colors');
const glob = require('glob');
const path = require('path');

let filePaths = glob.sync('src/comandos/**/*.js')
.map(a => path.join(process.cwd(), a));

module.exports = async (client) => {
  for (let filePath of filePaths) {
    try {
      const file = require(filePath);
      if (file.subcommand) {
        client.subcommands.set(file.subcommand, file);
      }
      if (file.message_based) {
        client.messagecommands.set(file.data.name, file);
      } 
      if (!file.message_based && !file.subcommand) {
        client.commands.set(file.data.name, file);
        client.restCommands.push(file.data);
      }
      console.log(
        '>>'.bgBlue.white,
        'Comando',
        (file.data ? file.data.name: file.subcommand).yellow,
        'cargado.'
      );
    } catch (e) {
      console.log('>>'.bgRed.black, 'No se pudo cargar el archivo', filePath.yellow);
    }
  }

  await client.config.discord.publishCommands(client.restCommands);
};