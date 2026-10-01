const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const progressSchema = new mongoose.Schema({
  chapterId: String,
  completed: { type: Boolean, default: false },
  quizScore: { type: Number, default: 0 },
  lastVisited: Date,
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6, select: false },
  progress: [progressSchema],
  practiceHistory: [{
    type: { type: String },
    data: mongoose.Schema.Types.Mixed,
    result: mongoose.Schema.Types.Mixed,
    createdAt: { type: Date, default: Date.now },
  }],
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
userSchema.methods.matchPassword = function (p) {
  return bcrypt.compare(p, this.password);
};

module.exports = mongoose.model('User', userSchema);
