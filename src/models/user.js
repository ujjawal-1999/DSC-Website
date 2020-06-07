const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');


const Schema = mongoose.Schema;


const userSchema = new Schema(
    {
        name: {
            type: String
        },
        username: {
            type: String,
            unique: true
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String
        },
        phone: {
            type: String
        },
        bio: {
            type: String
        },
        college: {
            type: String
        },
        skills: [
            {
                type: String
            }
        ],
        profileImageLocation: {
            type: String
        },
        socialLinks: {
                linkedin: String,
                github: String
        },
        projects :[
            {
                type: Schema.Types.ObjectId,
                ref: "Project" 
            }
        ]
    },
    {
        timestamps: true
    }
)

userSchema.plugin(uniqueValidator, { message: 'Email already in use.' });
module.exports = User = mongoose.model("User", userSchema);

