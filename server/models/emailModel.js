const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  subject: {
    type: String
  },
  to: {
    type: String,
    required: true
  },
   from: {
    type: String,
    required: true
  },
  purpose: {
    type: String,
    required: true
  },
  content :{
    type : String,
  },
  tone: {
    type: String,
    required: true
  },
   instructions : {
    type: String,
  },
  type: {
    type: String,
    enum: ["generated", "edited"],
    default: "generated"
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Email", emailSchema);