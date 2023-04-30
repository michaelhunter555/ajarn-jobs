const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "Users" },
  jobId: { type: mongoose.Types.ObjectId, required: true, ref: "Jobs" },
  coverLetter: { type: String, required: false },
  applicationDate: { type: Date, defualt: Date.now },
});

module.exports = mongoose.model("Application", applicationSchema);