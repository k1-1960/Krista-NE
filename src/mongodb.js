const mongoose = require('mongoose');
const colors = require('colors');


function MongoDB (URI) {
  mongoose.connect(URI)
  .then(console.log(">>".bgGreen.black, 'Base de datos conectada.'))
  .catch((err) => console.log("<Error>".red, err));
}

module.exports = MongoDB;