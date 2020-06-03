const mongoose = require("mongoose");
const mongooseTypePhone = require("mongoose-type-phone");
const mongooseTypeEmail = require("mongoose-type-email")

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
            type: mongoose.SchemaTypes.Email,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,

        },
        phone: {
            type: mongoose.SchemaTypes.Phone
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
        image: {
            type: Buffer
        },
        resume: {
            type: Buffer
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


module.exports = User = mongoose.model("User", userSchema);
