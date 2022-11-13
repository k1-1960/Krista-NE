const {
  Schema,
  model
} = require('mongoose');

const Guild = new Schema({
  _id: {
    type: String,
    required: true
  },
  antiUpperCase: {
    ignoredRoles: {
      type: Array,
      default: []
      },
      ignoreBots: {
        type: Boolean,
      default: false
      },
      enabled: {
        type: Boolean,
        default: false
      }
    }
});

  module.exports = {
    Guild: model("Guilds", Guild)
  };