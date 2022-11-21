const {DisTube} = require('distube');
const {SpotifyPlugin} = require('@distube/spotify');

module.exports = (client) => {
  client.distube = new DisTube(client, {
    emitNewSongOnly: false,
    leaveOnEmpty: true,
    leaveOnFinish: true,
    leaveOnStop: true,
    savePreviousSongs: true,
    emitAddSongWhenCreatingQueue: false,
    searchSongs: 0,
    nsfw: false,
    emptyCooldown: 25,
    ytdlOptions: {
      highWaterMark: 1024*1024*64,
      quality: "highestAudio",
      format: "audioOnly",
      liveBuffer: 60000,
      dlChunkSize: 1024*1024*4
    },
    plugins: [
      new SpotifyPlugin({
        parallel: true,
        emitEventsAfterFetching: true
      })
    ]
  });
}