const colors = require('colors');
const config = require(process.cwd() + '/src/config');
module.exports = {
  name: 'messageCreate',
  async run (client, message) {
    if (!message.guild) return;
    const guildData = await config.models.Guild
    .findOne({
      _id: message.guild.id
    }) || new config.models.Guild({
      _id: message.guild.id
    }).save();
    config.security.Everyone(message);

    let roles = await message.member.roles.cache.map((role) => role.id);

    if (!roles.some(r => guildData.antiUpperCase.ignoredRoles.includes(r))) {
      config.security.Uppercase(message);
    }
    if (!roles.some(r => guildData.antiAttachmentSpam.ignoredRoles.includes(r))) {
      config.security.Attachments(message, guildData);
    }
    
  }
};