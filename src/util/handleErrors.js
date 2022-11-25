const Logger = require(process.cwd() + '/src/util/logger');

process.on('uncaughtException', (error, origin) => {});
process.on('unhandledRejection', (reason, promise) => {});
process.on('uncaughtExceptionMonitor', (err, origin) => {});
