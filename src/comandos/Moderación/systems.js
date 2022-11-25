const {
  EmbedBuilder
} = require('discord.js');

module.exports = {
  def_permission: 'ManageGuild',
  data: {
    name: 'sistemas',
    name_localizations: {
      'es-ES': 'sistemas',
      'en-US': 'systems'
    },
    description: 'Configura los sistemas del bot.',
    description_localizations: {
      'es-ES': 'Configurar los sistemas del bot.',
      'en-US': 'Configure the bot systems.'
    },
    options: [{
      type: 2,
      name: 'caps',
      name_localizations: {
        'en-US': 'mayusculas',
        'es-ES': 'caps'
      },
      description: 'Ajustes del sistema anti mayúsculas.',
      description_localizations: {
        'es-ES': 'Configuración del sistema anti mayúsculas.',
        'en-US': 'Anti caps system settings.'
      },
      options: [{
        type: 1,
        name: 'habilitar',
        
        description: 'Activa el sistema anti mayúsculas.',
      },
        {
          type: 1,
          name: 'inhabilitar',
          description: 'Desactiva el sistema anti mayúsculas.',
        }, {
          type: 1,
          name: 'roles-ignorados',
          description: 'Lista de los roles a los que no se aplica la función.'
        }, {
          type: 1,
          name: 'agregar-rol-ignorado',
          description: 'Agrega un rol al que no se aplicará esta función.',
          options: [{
            type: 8,
            name: 'rol',
            description: 'Introduce el rol a ignorar.',
            required: true
          }]
        }, {
          type: 1,
          name: 'remover-rol-ignorado',
          description: 'Remueve un rol para que si se le aplique la función.',
          options: [{
            name: 'rol',
            description: 'Introduce el rol a remover.',
            type: 8,
            required: true
          }]
        }]
    }, {
      type: 2,
      name: 'attachmentspam',
      description: 'Ajustes del sistema anti spam de archivos.',
      options: [{
        type: 1,
        name: 'setmax',
        description: "Establece un maximo permitido de archivos en los mensajes.",
        options: [{
          type: 10,
          name: 'cantidad',
          description: 'Introduce la cantidad deseada.',
          required: true
        }]
      }, {
        type: 1,
        name: 'habilitar',
        description: 'Activa el sistema anti spam de archivos.'
      }, {
        type: 1,
        name: 'inhabilitar',
        description: 'Desactiva el sistema anti spam de archivos.'
      }]
    }]
  },
  async run (client, int, {
    guildData
  }) {
    const group = int.options.getSubcommandGroup();
    const subcommand = int.options.getSubcommand();

    if (group === 'caps') {
      if (subcommand === 'habilitar') {
        guildData.antiUpperCase.enabled = true;
        await client.config.models.Guild.findOneAndUpdate({
          _id: int.guildId
        }, guildData);

        int.reply({
          embeds: [
            new EmbedBuilder()
            .setTitle('Exito.')
            .setDescription(`El sistema anti mayúsculas ha sido habilitado exitosamente, para inhabilitar esta función use el comando \`/sistemas caps inhabilitar\`.`)
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
            .setDescription(`El sistema anti mayúsculas ha sido inhabilitado exitosamente, para volver a habilitar esta función use el comando \`/sistemas caps habilitar\`.`)
            .setColor(client._defColor)
          ]
        });
      }
      if (subcommand === 'roles-ignorados') {
        let roles = guildData.antiUpperCase.ignoredRoles;
        let listofroles = '';
        roles.map((rid) => listofroles += `<@&${rid}>,\n`);
        if (roles.length === 0) listofroles = "**\`\`\`\nNo hay roles para ignorar.\n\`\`\`**";
        
        int.reply({
          embeds: [
            {
              title: 'Roles ignorados.',
              description: 'Estos son los roles exentos de la función anti mayúsculas.\n' + listofroles,
              footer: {
                text: 'Para agregar uno nuevo, usa /sistemas caps agregar-rol-ignorado rol:<rol> y para remover uno existente usa /sistemas caps remover-rol-ignorado rol:<rol>'
              },
              color: client._defIntColor
            }
          ]
        })
      }
      if (subcommand === 'agregar-rol-ignorado') {
        let rol = int.options.getRole('rol');
        
        guildData.antiUpperCase.ignoredRoles.push(rol.id);
        
        await client.config.models.Guild
        .findOneAndUpdate({
          _id: int.guildId
        }, guildData);
        
        int.reply({
          embeds: [
            {
              title: "Rol excluido.",
              description: `Se excluyó ${rol.toString()} del sistema anti mayúsculas, ahora este rol podrá escribir más del 75% del contenido de sus mensajes en mayúsculas.`,
              footer: {
                text: 'Para retirar un rol de la lista de roles exentos, usa /sistemas caps remover-rol-ignorado rol:<@rol>'
              },
              color: client._defIntColor
            }
          ]
        });
      }
    }
    if (group === 'attachmentspam') {
      if (subcommand === 'setmax') {
        let number = int.options.getNumber('cantidad');
        
        guildData.antiAttachmentSpam.max = number;
        await client.config.models.Guild.findOneAndUpdate({
          _id: int.guildId
        }, guildData);

        int.reply({
          embeds: [
            new EmbedBuilder()
            .setTitle('Exito.')
            .setDescription(`El máximo de archivos permitidos en cada mensaje ha sido establecido a **${number}** archivos, para cambiarlo usa \`/sistemas attachmentspam setmax cantidad:<cantidad>\`.`)
            .setColor(client._defColor)
          ]
        });
      }
      if (subcommand === 'habilitar') {
        guildData.antiAttachmentSpam.enabled = true;
        await client.config.models.Guild.findOneAndUpdate({
          _id: int.guildId
        }, guildData);

        int.reply({
          embeds: [
            new EmbedBuilder()
            .setTitle('Exito.')
            .setDescription(`El sistema anti spam de archivos ha sido habilitado exitosamente, para inhabilitar esta función use el comando \`/sistemas attachmentspam inhabilitar\`.`)
            .setColor(client._defColor)
          ]
        });
      }
      if (subcommand === 'inhabilitar') {
        guildData.antiAttachmentSpam.enabled = false;
        await client.config.models.Guild.findOneAndUpdate({
          _id: int.guildId
        }, guildData);

        int.reply({
          embeds: [
            new EmbedBuilder()
            .setTitle('Exito.')
            .setDescription(`El sistema anti spam de archivos ha sido inhabilitado exitosamente, para volver a habilitar esta función use el comando \`/sistemas attachmentspam habilitar\`.`)
            .setColor(client._defColor)
          ]
        });
      }
    }
  }
};