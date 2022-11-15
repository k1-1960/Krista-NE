require("dotenv").config();
const {
  whatCase,
  percentage,
  deleteMessage
} = require('./util/functions');

module.exports = {
  models: require('./models'),
  
  keys: {
    MongoDB: process.env.MongoDB
  },

  discord: {
    TOKEN: process.env.TOKEN
  },

  security: {
    Uppercase: async (message) => {
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
    Attachments: async (message, guildData) => {
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
    }
  },

  util: {
    deleteMessage,
    percentage
  }
}