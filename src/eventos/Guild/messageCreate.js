const colors = require('colors');
const config = require(process.cwd() + '/src/config');
module.exports = {
  name: 'messageCreate',
  async run (client, message) {
    const guildData = await config.models.Guild
    .findOne({
      _id: message.guild.id
    }) || new config.models.Guild({
      _id: message.guild.id
    }).save();

    let roles = await message.member.roles.cache.map((role) => role.id);

    if (!roles.some(r => guildData.antiUpperCase.ignoredRoles.includes(r))) {
      config.security.Uppercase(message);
    }
  }
};