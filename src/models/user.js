const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    dscHandle: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    branch: {
      type: String,
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
    skills: [
      {
        name: String,
        level: String,
        duration: Number,
        description: String,
      },
    ],
    profileImageLocation: {
      type: String,
    },
    socialLinks: {
      linkedin: String,
      github: String,
      facebook: String,
      twitter: String,
    },
    achievements: [
      {
        name: String,
        platform: String,
        date: String,
        serial: Number,
        description: String,
      },
    ],
    personalProjects: [
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
        startdate: {
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
      },
    ],
    experiences: [
      {
        name: String,
        role: String,
        startdate: String,
        enddate: String,
        status: String,
        description: String,
      },
    ],
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    bookmarkBlogs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    blogs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator, {
  message: "Email already in use.",
});
module.exports = User = mongoose.model("User", userSchema);
