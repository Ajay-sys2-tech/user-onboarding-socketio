const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  type: { type: String, enum: ['text', 'time', 'number', 'choice'], required: true },
  options: [String],
  order: { type: Number, required: true },
});

module.exports = mongoose.model('Question', QuestionSchema);
