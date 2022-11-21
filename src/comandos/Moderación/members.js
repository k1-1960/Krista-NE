const {
  EmbedBuilder,
  PermissionsBitField
} = require('discord.js');

module.exports = {
  data: {
    name: 'moderacion',
    description: 'Comando de moderación.',
    dm_permission: false,
    options: [{
      type: 1,
      name: 'kick',
      description: 'Expulsa un miembro del servidor.',
      options: [{
        type: 6,
        name: 'usuario',
        description: 'Usuario al que deseas expulsar del servidor.',
        required: true
      },
        {
          type: 3,
          name: 'razon',
          description: 'Razón de la expulsión ("No se dió una razón" si no se da una).',
          required: false
        }]
    }, {
      type: 1,
      name: 'ban',
      description: 'Banea a un usuario del servidor.',
      options: [{
        type: 6,
        name: 'usuario',
        description: 'Usuario al que deseas banear.',
        required: true
      }, {
        type: 3,
        name: 'razon',
        description: 'Razón de el baneo ("No se dió una razón" si no se da una).',
        required: false
      }]
    }]
  },
  async run (client, int, {
    guildData
  }) {
    
    const getPerm = (perm) => {
      if(!int.member.permissions.has(PermissionsBitField.Flags[perm])) return int.reply({
        embeds: [
          new EmbedBuilder()
          .setTitle('Permisos insuficientes.')
          .setDescription('No cumples con los permisos suficientes para realizar esta acción, si crees que se trata de un error, contacta s mi desarrollador.')
          .setColor('#c42112')
        ]
      });
    }
    
    const group = int.options.getSubcommandGroup();
    const subcommand = int.options.getSubcommand();

    if (subcommand === 'kick') {
      getPerm("KickMembers");
      let razon = int.options.getString('razon') || "No se dió una razón.";
      let u = int.options.getUser('usuario');
      let member = await int.guild.members.fetch(u.id);

      if (u.id === client.user.id) return int.reply({
        embeds: [
          new EmbedBuilder()
          .setTitle('Uh?')
          .setDescription('Si quieres que salga de este servidor, usa el comando \`/bot salir-del-servidor\`.')
          .setColor(0x7c7a9d)
        ]
      });


      let pos = int.member.roles.highest.comparePositionTo(member.roles.highest);

      if (!member.kickable) return int.reply({
        embeds: [
          new EmbedBuilder()
          .setTitle('Error.')
          .setDescription('No puedo expulsar al usuario seleccionado.')
          .setColor(0xc42112)
        ]
      });

      if (pos <= 0) return int.reply({
        embeds: [
          new EmbedBuilder()
          .setTitle('Error.')
          .setDescription('No puedes expulsar a el usuario seleccionado debido a que posee un rol igual o mayor al tuyo.')
          .setFooter({
            text: `El rol más alto del usuario es @${member.roles.highest.name}.`
          })
          .setColor(0xc42112)
        ]
      });
      try {
        await member.kick(razon).then(int.reply({
          embeds: [
            new EmbedBuilder()
            .setTitle('Exito.')
            .setDescription(`[${u.tag} (${u.id})](https://discord.com/users/${u.id}) fue expulsado correctamente.`)
            .addFields([{
              name: 'Razón',
              value: razon
            }])
            .setColor(client._defColor)
          ]
        }));
      } catch (err) {
        console.log(err)
      }
    }
    if (subcommand === 'ban') {
      getPerm('BanMembers');
      let razon = int.options.getString('razon') || "No se dió una razón.";
      let u = int.options.getUser('usuario');
      let member = await int.guild.members.fetch(u.id);
      
      if (u.id === client.user.id) return int.reply({
        embeds: [
          new EmbedBuilder()
          .setTitle('Uh?')
          .setDescription('Si quieres que salga de este servidor, usa el comando \`/bot salir-del-servidor\`.')
          .setColor(0x7c7a9d)
        ]
      });
      
      let pos = int.member.roles.highest.comparePositionTo(member.roles.highest);

      if (!member.bannable) return int.reply({
        embeds: [
          new EmbedBuilder()
          .setTitle('Error.')
          .setDescription('No puedo banear al usuario seleccionado.')
          .setColor(0xc42112)
        ]
      });

      if (pos <= 0) return int.reply({
        embeds: [
          new EmbedBuilder()
          .setTitle('Error.')
          .setDescription('No puedes banear a el usuario seleccionado debido a que posee un rol igual o mayor al tuyo.')
          .setFooter({
            text: `El rol más alto del usuario es @${member.roles.highest.name}.`
          })
          .setColor(0xc42112)
        ]
      });
      
      try {
        await member.ban(razon).then(int.reply({
          embeds: [
            new EmbedBuilder()
            .setTitle('Exito.')
            .setDescription(`[${u.tag} (${u.id})](https://discord.com/users/${u.id}) fue baneado correctamente.`)
            .addFields([{
              name: 'Razón',
              value: razon
            }])
            .setColor(client._defColor)
          ]
        }));
      } catch (err) {
        console.log(err)
      }
    }
  }
};