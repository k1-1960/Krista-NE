module.exports = {
  name: 'empty',
  async run (client, list) {
    list.textChannel.send({
      content: '**💤 El canal de voz se encuentra vacío, abandonando el canal.**'
    });
  }
}