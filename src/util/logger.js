const fs = require('fs');
const path = require('path');

const MOTY = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre"
];

class Logger {
  constructor (content, options) {
    let date = new Date();
    this.Date = {
      day: date.getDate(),
      month: `${MOTY[(+date.getMonth())]}`,
      hour: (+date.getHours()),
      minute: (+date.getMinutes())
    };
    let text = `<` + `${this.Date.day} ${this.Date.month}, ${this.Date.hour}:${this.Date.minute}> ${content}`;
    let keys = Object.keys(options.params);

    keys.forEach((key) => {
      let reg = new RegExp('{{'+key+'}}', 'g');
      text = text.replace(reg, options.params[key]);
    });

    this.text = text;
  }

  write () {
    let content = fs.readFileSync(path.join(process.cwd(), 'log.txt'), 'utf8');
    fs.writeFileSync(
      path.join(process.cwd(), 'log.txt'),
      content + `\n${this.text}`,
      'utf8'
    );
  }
}

module.exports = Logger;