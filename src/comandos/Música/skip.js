module.exports = {
    data: { 
      name: "saltar",
      description: 'Salta a la siguiente canción en cola, si no hay más canciones, el bot se detendrá.',
    },
    run: async (client, int) => {
        if(!int.member.voice?.channel) return int.reply(`❌ **Tienes que estar en un canal de voz para ejecutar este comando!**`);
        if(int.guild.members.me.voice?.channel && int.member.voice?.channel.id != int.guild.members.me.voice?.channel.id) return int.reply(`❌ **Tienes que estar en el mismo canal de voz __QUE YO__ para ejecutar este comando!**`);
        client.distube.skip(int);
        int.reply(`⏭️ **Canción saltada.**`);
    }
}