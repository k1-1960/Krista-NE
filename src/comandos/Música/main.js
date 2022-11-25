module.exports = {
  data: {
    name: 'music',
    description: 'Music commands.',
    options: [{
      name: 'play',
      type: 1,
      description: 'Agrega una canción a la cola de reproducción.',
      options: [{
        type: 3,
        required: true,
        name: 'query',
        description: 'Nombre de la canción o url de YouTube o Spotify de la playlist o canción.'
      }]
    },
      {
        type: 1,
        name: "loop",
        description: '[💎] Control loop playback of songs.',
        options: [{
          type: 3,
          name: 'mode',
          description: 'Loop mode.',
          choices: [{
            name: 'Song',
            value: 'song'
          },
            {
              name: 'Queue',
              value: 'queue'
            },
            {
              name: 'Disabled',
              value: 'disabled'
            }],
          required: true
        }]
      }]
  },
  run () {}
}