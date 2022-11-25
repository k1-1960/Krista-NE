const {
  EmbedBuilder
} = require('discord.js');
const fs = require('fs');

module.exports = {
  data: {
    name: 'creador',
    name_localizations: {
      'en-US': 'creator',
      'es-ES': 'creador'
    },
    description: 'Acerca de mi creador.',
    description_localizations: {
      'en-US': 'About my creator.',
      'es-ES': 'Acerca de mi creador.'
    }
  },

  async run (client, int) {
    const fields = require(process.cwd() + '/k1.json');
    const embed = new EmbedBuilder()
    .setTitle('K1#1960 (K1)')
    .setDescription(client.res.creator_main)
    .setThumbnail('https://media.discordapp.net/attachments/1014436383865176125/1040149233199759470/IMG_20221109_231821.jpg')
    .addFields(fields)
    .setColor(0x252942)

    int.reply({
      embeds: [embed]
    })
  }
};