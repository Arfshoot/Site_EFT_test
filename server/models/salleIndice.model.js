const mongoose = require('mongoose');
const moment = require('moment');

var SalleIndice = new mongoose.Schema({

  sender: String,
  receiver: String,
  content: String,
  timestamp: {
    type: Date,
    default: Date.now,
    get: function(value) {
      return moment(value).format('HH:mm');
    }
  }
});

module.exports = mongoose.model('SalleIndice', SalleIndice)
   