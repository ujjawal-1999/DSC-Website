const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    role: {
      type: String,
    },
    startdate: { type: String },
    enddate: { type: String },
    techstack: { type: String },
    githuburl: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = Project = mongoose.model("Project", projectSchema);
