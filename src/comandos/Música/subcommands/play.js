module.exports = {
    subcommand: 'music.play',
    run: async (client, int) => {
      let args = int.options.getString('query');
        if(!int.member.voice?.channel) return int.reply(`❌ **Tienes que estar en un canal de voz para ejecutar este comando!**`);
        if(int.guild.members.me.voice?.channel && int.member.voice?.channel.id != int.guild.members.me.voice?.channel.id) return int.reply(`❌ **Tienes que estar en el mismo canal de voz __QUE YO__ para ejecutar este comando!**`);
        client.distube.play(int.member.voice?.channel, args, {
            member: int.member,
            textChannel: int.channel,
            int
        });
        int.reply(`🔎 **Buscando \`${args}\`...**`);
    }
}