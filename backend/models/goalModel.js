const mongoose = require('mongoose');

const goalSchema = mongoose.Schema(
  {
    goalText: {
      type: String,
      required: [true, 'Please add a text value'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Goal', goalSchema);