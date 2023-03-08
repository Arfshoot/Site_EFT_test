const mongoose = require('mongoose');

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
        get: function() {
            return this._timestamp.toLocaleString();
        }
    }
});

mongoose.model('Salle-Msg', SalleMsgSchema);    