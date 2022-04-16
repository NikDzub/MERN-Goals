const mongoose = require('mongoose');

const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'User required'],
      ref: 'User',
    },
    goalText: {
      type: String,
      required: [true, 'Goal text cannot be empty'],
    },
    private: { type: Boolean, default: false },
    userName: { type: String, required: [true, 'no username'] },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Goal', goalSchema, 'goals');
