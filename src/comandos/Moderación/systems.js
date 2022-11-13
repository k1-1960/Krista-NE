const {
  EmbedBuilder
} = require('discord.js');

module.exports = {
  data: {
    name: 'sistemas',
    description: 'Configura los sistemas del bot.',
    options: [{
      type: 2,
      name: 'antiuppercase',
      description: 'Ajustes de el sistema anti mayúsculas.',
      options: [{
        type: 1,
        name: 'habilitar',
        description: 'Activa el sistema anti mayúsculas.',
      },
        {
          type: 1,
          name: 'inhabilitar',
          description: 'Desactiva el sistema anti mayúsculas.',
        }]
    }]
  },
  async run (client, int, {
    guildData
  }) {
    const group = int.options.getSubcommandGroup();
    const subcommand = int.options.getSubcommand();

    if (group === 'antiuppercase') {
      if (subcommand === 'habilitar') {
        guildData.antiUpperCase.enabled = true;
        await client.config.models.Guild.findOneAndUpdate({
          _id: int.guildId
        }, guildData);

        int.reply({
          embeds: [
            new EmbedBuilder()
            .setTitle('Exito.')
            .setDescription(`El sistema anti mayúsculas ha sido habilitado exitosamente, para inhabilitar esta función use el comando \`/mod antiuppercase inhabilitar\`.`)
            .setColor(client._defColor)
          ]
        });
      }
      if (subcommand === 'inhabilitar') {
        guildData.antiUpperCase.enabled = false;
        await client.config.models.Guild.findOneAndUpdate({
          _id: int.guildId
        }, guildData);

        int.reply({
          embeds: [
            new EmbedBuilder()
            .setTitle('Exito.')
            .setDescription(`El sistema anti mayúsculas ha sido inhabilitado exitosamente, para volver a habilitar esta función use el comando \`/mod antiuppercase habilitar\`.`)
            .setColor(client._defColor)
          ]
        });
      }
    }
  }
};