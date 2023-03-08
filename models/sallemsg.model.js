const mongoose = require('mongoose');
const moment = require('moment');

var SalleMsgSchema = new mongoose.Schema({
  _id_room: {
    type: String
  },
  sender: String,
  receiver: String,
  content: String,
  timestamp: {
    type: Date,
    default: Date.now,
    get: function(value) {
      return moment(value).format('YYYY-MM-DD, HH:mm');
    }
  }
});

mongoose.model('Salle-Msg', SalleMsgSchema);
   