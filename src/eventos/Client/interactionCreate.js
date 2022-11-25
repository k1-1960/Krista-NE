const {
  PermissionsBitField,
  EmbedBuilder
} = require('discord.js');
const fs = require('fs');
const config = require(process.cwd() + '/src/config');

module.exports.name = "interactionCreate";
module.exports.run = async (client, interaction) => {
  const guildData = await config.models.Guild
  .findOne({
    _id: interaction.guildId
  }) || await new config.models.Guild({
    _id: interaction.guildId
  }).save();
  
  let locale = guildData.lang || interaction.guild.preferredLocale;
  if (!['en-US', 'es-ES'].includes(locale)) locale = 'en-US';
  
  client.res = JSON.parse(fs.readFileSync(process.cwd() + `/src/locales/${locale}.json`, 'utf8'));
  client.formatRes = function (res, formats) {
    let answer = client.res[res];
    for (let key of Object.keys(formats)) {
      let reg = new RegExp('{' + key + '}', 'g');
      answer = answer.replace(reg, formats[key]);
    }
    return answer;
  }

  if (interaction.type === 2) {
    client._defColor = interaction.guild.members.me.displayHexColor;
    client._defIntColor = parseInt(interaction.guild.members.me.displayHexColor.replace('#', '0x'));

    const command = client.commands.get(
      interaction.commandName
    );
    
    const subcommand = interaction.options.getSubcommand(false) ? client.subcommands.get(`${interaction.commandName}.${interaction.options.getSubcommand(false)}`) : false;
    
    if (subcommand) {
      subcommand.run(client, interaction, guildData);
    }
    
    if (!subcommand && command) {
      if (command.def_permission) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags[command.def_permission])) {
          return interaction.reply({
            embeds: [
              new EmbedBuilder()
              .setTitle('Permisos insuficientes.')
              .setDescription('No cumples con los permisos suficientes para realizar esta acción, si crees que se trata de un error, contacta s mi desarrollador.')
              .setColor('#c42112')
            ]
          });
        } else {
          try {

            command.run(client, interaction, {
              guildData
            });
          } catch (_) {
            console.log(_);
          }
        }
      } else {
        try {

          command.run(client, interaction, {
            guildData
          });
        } catch (_) {
          console.log(_);
        }
      }
    }

  }
}