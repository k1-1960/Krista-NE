const {
  EmbedBuilder
} = require('discord.js');

module.exports = {
  data: {
    name: 'usuario-info',
    name_localizations: {
      'en-US': 'user-info',
      'es-ES': 'usuario-info'
    },
    description: 'Obten información de un usuario.',
    description_localizations: {
      'en-US': 'Get information from a user.',
      'es-ES': 'Obten información de un usuario.'
    },
    options: [{
      type: 6,
      name: 'usuario',
      name_localizations: {
        'en-US': 'user',
        'es-ES': 'usuario'
      },
      description: 'Usuario cuya información desea ver.',
      description_localizations: {
        'es-ES': 'User whose information to see.',
        'en-US': 'Usuario cuya información desea ver.'
      },
      required: false
    }]
  },
  async run (client, int) {
    let target = await int.guild.members.fetch(int.options.getUser('usuario') ? int.options.getUser('usuario').id : int.user.id);

    if (!target) return int.reply({
      content: ':x: | Ocurrió un error al intentar obtener el usuario objetivo, intentelo nuevamente.',
      ephemeral: true
    });

    const OverView = new EmbedBuilder()
    .setTitle(target.user.tag + (target.nickname ? ` (${target.nickname})`: ''))
    .addFields([{
      name: 'Fecha de creación de cuenta.',
      value: `<t:${Math.floor(+target.user.createdAt.getTime() / 1000)}> (<t:${Math.floor(+target.user.createdAt.getTime() / 1000)}:R>)`
    }, {
      name: 'Miembro del servidor desde',
      value: `<t:${Math.floor(+target.joinedAt.getTime() / 1000)}> (<t:${Math.floor(+target.joinedAt.getTime() / 1000)}:R>)`
    }, {
      name: '¿Es un bot?',
      value: (target.user.bot ? 'Si': 'No')
    }, {
      name: 'Rol más alto en el servidor.',
      value: target.roles.highest.toString()
    }])
    .setColor(target.displayHexColor)
    .setThumbnail(target.displayAvatarURL({
      dynamic: true,
      size: 1024
    }));

    int.reply({
      embeds: [OverView]
    });
  }
};