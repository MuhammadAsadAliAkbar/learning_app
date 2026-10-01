const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  chapterId: { type: String, required: true, unique: true },
  number: Number,
  title: String,
  sections: [{
    title: String,
    content: String,
    examples: [String],
  }],
  quiz: [{
    question: String,
    options: [String],
    correctIndex: Number,
    explanation: String,
  }],
}, { timestamps: true });

module.exports = mongoose.model('Chapter', chapterSchema);
