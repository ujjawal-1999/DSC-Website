const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
    },
    dscHandle: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        match: [/([a-z\.]{2,6})([\%\?\=\/\w \.-]*)*\/?$/, "is invalid"],
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    branch: {
        type: String,
    },
    badge: {
        type: Number,
        default: 0 /* 1 - Founding Members, 2 - Core Members, 3 - Members*/
    },
    degree: {
        type: String,
    },
    batch: {
        type: String,
    },
    active: {
        type: Boolean,
        default: false,
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now,
    },
    phone: {
        type: String,
    },
    bio: {
        type: String,
    },
    college: {
        type: String,
    },
    skills: [{
        name: String,
        level: String,
        duration: Number,
        description: String,
    }, ],
    profileImageLocation: {
        type: String,
    },
    socialLinks: {
        linkedin: {
            type: String,
            trim: true
        },
        github: {
            type: String,
            trim: true
        },
        facebook: {
            type: String,
            trim: true
        },
        twitter: {
            type: String,
            trim: true
        }
    },
    achievements: [{
        name: String,
        platform: String,
        date: String,
        serial: String,
        description: String,
    }, ],
    personalProjects: [{
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
        hosturl: {
            type: String,
        },
    }, ],
    experiences: [{
        name: String,
        role: String,
        startdate: String,
        enddate: String,
        status: String,
        description: String,
    }, ],
    projects: [{
        type: Schema.Types.ObjectId,
        ref: "Project",
    }, ],
    bookmarkBlogs: [{
        type: Schema.Types.ObjectId,
        ref: "Blog",
    }, ],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "Blog",
    }, ],
    blogs: [{
        type: Schema.Types.ObjectId,
        ref: "Blog",
    }, ],
}, {
    timestamps: true,
});

// userSchema.plugin(uniqueValidator, {
//   message: "Email already in use.",
// });
module.exports = User = mongoose.model("User", userSchema);