const mongoose = require('mongoose');

const goalSchema = mongoose.Schema(
  {
    goalText: {
      type: String,
      required: [true, 'Goal text cannot be empty'],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Goal', goalSchema);
