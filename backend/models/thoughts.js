import mongoose from "mongoose";

const ThoughtsSchema = mongoose.Schema({
  message: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 140,
    trim: true
  },
  hearts: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: () => new Date()
  }
});

const thoughts = mongoose.model("Thoughts", ThoughtsSchema); 

module.exports = thoughts;