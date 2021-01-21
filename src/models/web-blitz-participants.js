const mongoose = require("mongoose");
const {
    ObjectId
} = mongoose.Schema.Types;

const WebBlitzParticipantSchema = new mongoose.Schema({
       name: {
           type: String,
           required: true
       },
       phone: {
           type: String,
           required: true,
       },
       email: {
           type: String,
           required: true
       },
       scholar_id: {
           type: String,
           required: true
       }
    }, 
    {
    timestamps: true,
});

module.exports = mongoose.model("webBlitzParticipant", WebBlitzParticipantSchema);