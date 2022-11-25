const {
  RepeatMode
} = require("distube");

module.exports = {
  name: 'playSong',
  async run (client, list, song) {
    if (list.repeatMode === RepeatMode.DISABLED) {
      list.textChannel.send({
        content: `▶️ **Reproduciéndose ahora \`${song.name}\` con una duración de ${song.formattedDuration}.**\n**Pedida por ${song.user}**`
      });
    }
  }
}