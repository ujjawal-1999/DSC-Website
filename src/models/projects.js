const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const projectsSchema = new mongoose.Schema({
	
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
    },
    techStack: [
        {
            type: String
        }
    ],
	author: {
		 type: ObjectId,
		 ref: "User",
		 required: true
	},
	image: {
		type: String,
		default: ''
	},
	category: {
		type: String,
		required: true
	},
	gitRepoLink: {
        type: String,
        required: true
    },
    hostLink: {
        type: String
    },
    projectLeads: [
        {
            type: ObjectId,
            ref: "User",
            required: true
        }
    ],
    projectDevelopers: [
        {
            type: ObjectId,
            ref: "User"
        }
    ],
    ongoing: {
        type: Boolean,
        default: true
    }
},
{
	timestamps: true
})

module.exports = mongoose.model( "Projects", projectsSchema );