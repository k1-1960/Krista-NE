require("dotenv").config();
const whatCase = l => l === l.toUpperCase() ? true: false;
const percentage = function (origin, resta) {
  let restado = origin - resta;
  return ((restado * 100)/origin);
};

async function deleteMessage (msg, time) {
  if (time) {
    setTimeout(async () => {
      await msg.delete();
    }, time * 1000);
  } else {
    await msg.delete();
  }
}

module.exports = {
  discord: {
    TOKEN: process.env.TOKEN
  },

  security: {
    Uppercase: async (message) => {
      if (message.author.bot || message.content.length < 60) return;
      let texto = message.content;

      let upper = 0;
      let lower = 0;

      for (let i = 0; i < texto.length; i++) {
        let letter = texto[i];

        whatCase(letter) === true ? upper = upper + 1: lower = lower + 1;
      }

      if (percentage(texto.length, lower) > 75) {
        await message.delete();
        await message.channel.send({
          content: message.author.toString(),
          embeds: [{
            title: "Tu mensaje se eliminó.",
            description: "Se eliminó debido a que contiene el 75% o más de sus caracteres en mayúsculas.",
            color: 0xc42112
          }]
        }).then(m => deleteMessage(m, 7.5));
      }
    }
  }
}