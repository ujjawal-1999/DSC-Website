const mongoose = require("mongoose");
const {
    ObjectId
} = mongoose.Schema.Types;

const PersonalProjectsSchema = new mongoose.Schema({
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        role: {
            type: String,
        },
        startdate: {
            type: String,
        },
        status: {
            type: String,
        },
        enddate: {
            type: String,
        },
        techstack: {
            type: String,
        },
        githuburl: {
            type: String,
        },
        askCollaboration:{
            type: Boolean,
        },
        hosturl: {
            type: String,
        },
        member: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
    }, 
    {
    timestamps: true,
});

module.exports = mongoose.model("personalProjects", PersonalProjectsSchema);