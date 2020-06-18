const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const ratingSchema = new mongoose.Schema({
	
	userId: {
		type: ObjectId,
		ref: "User",
		required: true
	},
	blogId: {
		type: ObjectId,
		ref: "Blog",
		required: true
	},
	value: {
		type: Number,
		default: 0
	},
},
{
	timestamps: true
})

module.exports = mongoose.model( "Ratings", ratingSchema );