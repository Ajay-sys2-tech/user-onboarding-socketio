const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String }, // 'user' if it is null 
  chatStatus: {
    type: Number,
    default: -1, // -1: not started, 0: started onboarding, X: answerd X questions
  },
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);
