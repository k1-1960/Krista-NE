const { PermissionsBitField } = require('discord.js');

module.exports.name = "interactionCreate";
module.exports.run = async (client, interaction) => {
  function verifyPermissions() {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) return interaction.reply({
      content:  'No tienes permiso para usar este comando.',
      ephemeral: true
    });
  }

  if (interaction.type === 2) {

    const command = client.commands.get(
      interaction.commandName
    );

    if (command) {
      try {
        command.run(client, interaction);
      } catch (_) {
        console.log(_);
      }
    }

  }
}