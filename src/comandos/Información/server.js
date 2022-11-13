const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder
} = require('discord.js');
const fs = require('fs');

module.exports = {
  data: {
    name: 'serverinfo',
    description: 'Información general sobre el servidor.'
  },

  async run (client, int) {

    let allmembers = await int.guild.members.fetch();
    let allroles = await int.guild.roles.fetch();

    let getRoles = allroles.map((a) => {
      return a.toString();
    });

    const embed = new EmbedBuilder()
    .setTitle(int.guild.name + ` [${int.guild.id}]`)
    .addFields([{
      name: client._emojis.person + ' Cantidad de miembros',
      value: int.guild.memberCount + ' miembros.' + `\n> **\`${allmembers.filter(x => x.user.bot).size}\`** bots.\n> **\`${allmembers.filter(x => !x.user.bot).size}\`** personas reales.`
    }, {
      name: client._emojis.emojis + ' Cantidad de emojis.',
      value: `${int.guild.emojis.cache.size} emojis.\n> **\`${int.guild.emojis.cache.filter(x => x.animated === true).size}\`** animados.\n> **\`${int.guild.emojis.cache.filter(x => x.animated === false).size}\`** estáticos.`
    }, {
      name: client._emojis.hashtag + ' Cantidad de canales.',
      value: `**\`${int.guild.channels.cache.size}\`** canales en total.\n> **\`${int.guild.channels.cache.filter(x => x.type === 0).size}\`** canales de texto.\n> **\`${int.guild.channels.cache.filter(x => x.type === 2).size}\`** canales de voz.\n> **\`${int.guild.channels.cache.filter(x => x.type === 4).size}\`** categorías.\n> **\`${int.guild.channels.cache.filter(x => x.type === 15).size}\`** foros.\n> **\`${int.guild.channels.cache.filter(x => x.type === 5).size}\`** canales de anuncios.`
    }, {
      name: client._emojis.moderation + ' Canal de las reglas.',
      value: `${int.guild.rulesChannel ? int.guild.rulesChannel.toString(): 'No hay canal definido para las reglas.'}`
    }, {
      name: client._emojis.shield + ' Roles',
      value: getRoles.slice(0, 15).join(',\n') + (getRoles.length > 15 ? '...': '')
    }])
    .setImage(int.guild.iconURL({
      dynamic: true, size: 1024
    }))
    .setColor('Blurple');

    if (int.guild.description) embed.setDescription(int.guild.description);

    const Button = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
      .setCustomId('serverinfo.delete')
      .setStyle('Danger')
      .setLabel('Eliminar')
      .setEmoji("🗑️")
    );

    let msg = await int.reply({
      embeds: [embed],
      components: [Button]
    });

    let filtro = i => i.user.id === int.user.id;
    let collector = msg
    .createMessageComponentCollector({
      filter: filtro, time: 180000
    });

    collector.on('collect', async i => {
      if (!i.isButton()) return;
      if (i.customId === 'serverinfo.delete') {
        await int.deleteReply();
        await i.reply({
          content: "El mensaje de ha borrado correctamente.", ephemeral: true
        });
        collector.stop();
      }
    });
  }
};