module.exports = {
  subcommand: 'music.loop',
  run: async (client, int) => {
    let choice = int.options.getString('mode');

    if (!int.member.voice?.channel) return int.reply(`❌ **Tienes que estar en un canal de voz para ejecutar este comando!**`);
    if (int.guild.members.me.voice?.channel && int.member.voice?.channel.id != int.guild.members.me.voice?.channel.id) return int.reply(`❌ **Tienes que estar en el mismo canal de voz __QUE YO__ para ejecutar este comando!**`);
    let mode = client.distube.setRepeatMode(int, RepeatMode[choice.toUpperCase()]);

    switch (mode) {
      case RepeatMode.SONG:
        int.reply(`🔂 **Bucle en modo \`canción\`.**\n**Ahora se repetirá la canción actual.**`);
        break;
      case RepeatMode.QUEUE:
        int.reply(`🔁 **Bucle en modo \`cola\`.**\n**Ahora se repetirá la cola de reproducción actual.**`);
        break;
      case RepeatMode.DISABLED:
        int.reply(`⚫ **Bucle apagado.**`);
        break;
    }
  }
}