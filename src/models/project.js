const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const projectSchema = new Schema(
    {
        title: {
            type: String
        },
        description: {
            type: String
        }
    },{
        timestamps: true
    }
)

module.exports = Project = mongoose.model("Project", projectSchema)