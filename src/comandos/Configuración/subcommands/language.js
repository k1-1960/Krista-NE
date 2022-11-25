module.exports = {
  subcommand: 'config.language',
  async run (client, int, GD) {
    const lang = int.options.getString('language');
    
    if (GD.lang === lang) return int.reply({
      content: `:x: **${client.res.already_lang}**`,
      ephemeral: true
    });
    
    GD.lang = lang;
    
    await client.config.models.Guild
    .findOneAndUpdate({ _id: int.guildId }, GD);
    
    int.reply({
      content: `👍 **${client.res.lang_selected}**`
    });
  }
}