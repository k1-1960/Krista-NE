const {
  EmbedBuilder
} = require('discord.js');
const fs = require('fs');

module.exports = {
  data: {
    name: 'server-info',
    description: 'Información general sobre el servidor.'
  },

  async run (client, int) {
    const embed = new EmbedBuilder()
    .setTitle(int.guild.name + ` [${int.guild.id}]`)
    .addFields([{
      name: 'Cantidad de miembros',
      value: int.guild.memberCount + ' miembros.'
    }, {
      name: 'Cantidad de emojis.',
      value: `${int.guild.emojis.cache.size} emojis (${int.guild.emojis.cache.filter(x => x.animated === true).size} animados y ${int.guild.emojis.cache.filter(x => x.animated === false).size} estáticos).`
    }])
    .setImage(int.guild.iconURL({ dynamic: true, size: 1024 }));
    
    if (int.guild.description) embed.setDescription(int.guild.description);
    
    int.reply({
      embeds: [embed]
    });
  }
};