const {
  Schema,
  model
} = require('mongoose');

let AllSchemas = {
  Guild: new Schema({
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
    },
    antiAttachmentSpam: {
      max: {
        type: Number,
        default: 0
      },
      enabled: {
        type: Boolean,
        default: false
      },
      ignoredRoles: {
        type: Array,
        default: []
      }
    }
  })
};

let keys = Object.keys(AllSchemas);
let exporting = {};

keys.forEach((key) => {
  exporting[key] = model(key, AllSchemas[key]);
});

module.exports = exporting;