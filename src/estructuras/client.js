const Discord = require('discord.js');
const {
  GatewayIntentBits
} = Discord;
const colors = require('colors');

const default_options = {
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
};

class Client extends Discord.Client {
  constructor (options = default_options) {
    super (options);
  }

  login (token, cb) {
    try {
      super.login(token);
      typeof cb === 'function' ? cb(): console.log('Bot iniciado.');
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Client;