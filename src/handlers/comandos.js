const {
  readdirSync
} = require('fs');
const path = require('path');
require("dotenv").config();
const {
  REST
} = require('@discordjs/rest');
const {
  Routes
} = require('discord-api-types/v10');
const rest = new REST({
  version: "10"
}).setToken(process.env.TOKEN);

function rd (folder) {
  return path.join(process.cwd(), folder);
}

async function Commands (client) {
  const allCommands = [];

  readdirSync(rd('src/comandos'))
  .forEach(function (folder) {
    readdirSync(rd(`src/comandos/${folder}`))
    .filter(f => f.endsWith('.js'))
    .forEach(file => {
      const command = require(rd(`src/comandos/${folder}/${file}`));
      try {
        client.commands.set(command.data.name, command);
        allCommands.push(command.data);
      } catch (error) {
        console.log(error);
      }
    });
  });

  await rest.put(
    Routes.applicationCommands(
      "1009501419415552030"
    ), {
      body: allCommands
    }
  );
}

module.exports = Commands;