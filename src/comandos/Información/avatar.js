const {
  EmbedBuilder
} = require('discord.js');

module.exports = {
  data: {
    name: 'avatar',
    description: 'Obten los avatares de un miembro.',
    options: [{
      type: 6,
      name: 'usuario',
      description: 'Usuario del cual quieres obtener los avatares.',
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