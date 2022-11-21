module.exports = {
  name: 'playSong',
  async run (client, list, song) {
    list.textChannel.send({
      content: `▶️ **Reproduciéndose ahora \`${song.name}\` con una duración de ${song.formattedDuration}.**\n**Pedida por ${song.user}**`
    });
    client.channels.fetch(list.voice.channelId).then(ch => ch.setName(song.name));
  }
}