const Logger = require(process.cwd() + '/src/util/logger');

process.on('uncaughtException', (error, origin) => {
  new Logger('{{origin}}: {{error}}', {
    params: {
      error: `${error}`.split(': ')[1],
      origin: origin
    }
  }).write();
});