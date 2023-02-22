const mongoose  = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        posterId:{
            type: String,
            required: true
        },
        lastName:{
            type: String,
            required: true,
            minlength:3
        },
        firstName:{
            type: String,
            required: true,
            minlength:3
        },
        statut:{
            type: String,
            required: true
        },
        // Etat-Province user

        etatProv:{
            type:String,
            max: 1024,
            minlength:3
        },

        // Pays user
        pays:{
            type:String,
            required: true,
            max: 1024,
            minlength:3
        },
        message:{
            type: String,
            trim: true,
            maxLength: 500
        }
    },
    {
        timestamps: true, 
    }
)
module.exports = mongoose.model('post', PostSchema)