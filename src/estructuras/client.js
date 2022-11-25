const Discord = require('discord.js');
const config = require(process.cwd() + '/src/config');
const {
  GatewayIntentBits
} = Discord;
const colors = require('colors');
const default_options = {
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ]
};

class Client extends Discord.Client {
  constructor (options = default_options) {
    super (options);
    this.commands = new Discord.Collection();
    this.messagecommands = new Discord.Collection();
    this.subcommands = new Discord.Collection();
    this.restCommands = [];
    this.config = config;
    this._emojis = {
      emojis: '<:emojis:1041139726394065046>',
      hashtag: '<:hashtag:1041139630235471954>',
      moderation: '<:moderation:1041139701941280849>',
      krista_avatar: '<:krista_avatar:1040093869624279132>',
      shield: '<:shield:1041139654059102318>',
      person: '<:person:1041139677895340153>',
      right: '<:right:1040093961680846920>',
      left: '<:left:1040093914109067334>'
    };
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