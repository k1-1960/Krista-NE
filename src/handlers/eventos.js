const {
  readdirSync
} = require('fs');
const path = require('path');

function rd (folder) {
  return path.join(process.cwd(), folder);
}

function Events (client) {
  readdirSync(rd('src/eventos'))
  .forEach(function (folder) {
    readdirSync(rd(`src/eventos/${folder}`))
    .filter(f => f.endsWith('.js'))
      .forEach(file => {
        const event = require(rd(`src/eventos/${folder}/${file}`));
        try {
          client.on(event.name, (...args) => event.run(client, ...args));
        } catch (error) {
          console.log(error);
        }
      });
    });
  }

  module.exports = Events;