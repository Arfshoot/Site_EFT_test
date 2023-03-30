const mongoose = require('mongoose');

const FaqSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

const Faq = mongoose.model('Faq', FaqSchema);

module.exports = Faq;