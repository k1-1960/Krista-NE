module.exports = {
  name: 'finish',
  async run (client, list) {
    list.textChannel.send({
      content: '**🏜️ La cola de reproducción esta vacía, abandonando el canal de voz.**',
      embeds: [{
        title: 'Gracias por usar este servicio beta.',
        description: "Si tienes sugerencias no dudes en enviarlas a mi desarrollador en el [servidor de soporte](https://discord.gg/fYhFTVAZr2).",
        color: 0x007700
      }]
    });
  }
}