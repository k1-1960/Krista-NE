require("dotenv").config();

const {
  whatCase,
  percentage,
  deleteMessage
} = require('./util/functions');
let UserEveryones = [];

const {
  REST
} = require('@discordjs/rest');
const {
  Routes
} = require('discord-api-types/v10');
const rest = new REST({
  version: "10"
}).setToken(process.env.TOKEN);

module.exports = {
  models: require('./models'),
  
  keys: {
    MongoDB: process.env.MongoDB
  },

  discord: {
    TOKEN: process.env.TOKEN,
    async publishCommands (commands) {
      await rest.put(
        Routes.applicationCommands(
          "1009501419415552030"
        ), {
          body: commands
        }
      );
    }
  },

  security: {
    
    
    async Uppercase (message) {
      if (message.author.bot || message.content.length < 60) return;
      let texto = message.content;

      let upper = 0;
      let lower = 0;

      for (let i = 0; i < texto.length; i++) {
        let letter = texto[i];
        let nan = isNaN(letter);
        let isLe = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz'.includes(letter);
        let Case = whatCase(letter);

        if (Case === true && isLe === true) upper = upper + 1;
        if (Case === false && isLe === true) lower = lower + 1;
      }

      let per = percentage(texto.length, lower);
      console.log(per);
      if (per > 75) {
        await message.delete();
        await message.channel.send({
          content: message.author.toString(),
          embeds: [{
            title: "Mensaje eliminado.",
            fields: [{
              name: 'Razón',
              value: "Contiene el 75% o más de sus caracteres en mayúsculas."
            }],
            footer: {
              text: 'Para evitar esto, usa menos mayúsculas o pide a algún administrador del servidor que inhabilite esta función.'
            },
            color: 0xc42112
          }]
        }).then(m => deleteMessage(m, 15));
      }
    },
    
    async Attachments (message, guildData) {
      let attachments = message.attachments;
      let limit = guildData.antiAttachmentSpam.max;
      
      if (limit > 0 && attachments.size > limit) {
        await message.delete();
        await message.channel.send({
          embeds: [{
            title: "Mensaje eliminado.",
            fields: [{
              name: 'Razón',
              value: "Excedió el maximo de archivos (attachments) permitidos en un mensaje."
            }],
            footer: {
              text: 'Para evitar esto, envía archivos sin exceder la cantidad permitida por los administradores o pide a algún administrador del servidor que inhabilite esta función.'
            },
            color: 0xc42112
          }]
        }).then(m => deleteMessage(m, 15));
      }
    },
    
    async Everyone (message) {
      if (message.everyone) {
        UserEveryones.push({
          uid: message.author.id,
          mid: message.id,
          ts: (+Date.now() / 1000)
        });
        
        let thisUserEveryones = UserEveryones
        .filter(obj => obj.uid === message.author.id);
        console.log(thisUserEveryones);
        if (thisUserEveryones.length >= 2) {
          if ((thisUserEveryones[0].ts + 30) > thisUserEveryones[1].ts) {
            thisUserEveryones.forEach(x => {
              let everyone = message.channel.messages.fetch(x.mid).then(m => m.delete());
            })
          }
        }
      }
      
      
    }
    
    
  },

  util: {
    deleteMessage,
    percentage
  }
}