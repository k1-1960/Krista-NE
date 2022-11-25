const {
  EmbedBuilder
} = require('discord.js');

module.exports = {
  data: {
    name: 'avatar',
    description: 'Obtenga los avatares de un miembro.',
    description_localizations: {
      'es-ES': 'Obtenga los avatares de un miembro.',
      'en-US': 'Get a member\'s avatars.'
    },
    options: [{
      type: 6,
      name: 'usuario',
      name_localizations: {
        'en-US': 'user',
        'es-ES': 'usuario'
      },
      description: 'Usuario del que desea obtener los avatares.',
      description_localizations: {
        'es-ES': 'Usuario del que desea obtener los avatares.',
        'en-US': 'User from whom you want to get the avatars.'
      },
      required: false
    }]
  },
  async run (client, int) {
    const target = await int.guild.members.fetch(int.options.getUser('usuario') ? int.options.getUser('usuario').id: int.user.id);

    const globalAvatar = target.user.avatarURL({
      dynamic: true,
      size: 1024
    });

    const serverAvatar = target.displayAvatarURL({
      dynamic: true,
      size: 1024
    });

    console.log({
      globalAvatar, serverAvatar
    })

    const global = new EmbedBuilder()
    .setTitle(`Avatar global de ${target.user.tag} ${(target.nickname ? `(${target.nickname})`: '')}`)
    .setImage(globalAvatar)
    .setColor(target.displayHexColor);

    const embeds = [global];

    if (globalAvatar !== serverAvatar) {
      embeds.push(new EmbedBuilder()
        .setTitle(`Avatar de servidor de ${target.user.tag} ${(target.nickname ? `(${target.nickname})`: '')}`)
        .setImage(serverAvatar)
        .setColor(target.displayHexColor));
    }

    await int.reply({
      embeds
    });
  }
};