const {
  PermissionsBitField
} = require('discord.js');
const config = require(process.cwd() + '/src/config');

module.exports.name = "interactionCreate";
module.exports.run = async (client, interaction) => {
  const guildData = await config.models.Guild
  .findOne({
    _id: interaction.guildId
  }) || await new config.models.Guild({
    _id: interaction.guildId
  }).save();

  if (interaction.type === 2) {

    const command = client.commands.get(
      interaction.commandName
    );

    if (command) {
      try {
        client.config = config;
        client._defColor = interaction.guild.members.me.displayHexColor;
        client._emojis = {
          emojis: '<:emojis:1041139726394065046>',
          hashtag: '<:hashtag:1041139630235471954>',
          moderation: '<:moderation:1041139701941280849>',
          krista_avatar: '<:krista_avatar:1040093869624279132>',
          shield: '<:shield:1041139654059102318>',
          person: '<:person:1041139677895340153>',
          right: '<:right:1040093961680846920>',
          left: '<:left:1040093914109067334>'
        };
        command.run(client, interaction, {
          guildData
        });
      } catch (_) {
        console.log(_);
      }
    }

  }
}