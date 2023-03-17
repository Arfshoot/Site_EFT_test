const mongoose = require('mongoose');
const moment = require('moment');

var SalleForex = new mongoose.Schema({

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

mongoose.model('SalleForex', SalleForex);
   