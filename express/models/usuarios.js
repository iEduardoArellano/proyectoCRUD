var mongoose = require('mongoose');

var modelSchema = mongoose.Schema({
    name: {
        type:String,
        minlength: [3,"name corto"],
        maxlength: [30,"name largo"],
        required: [true,"Se requiere un nombre"]
    },
    email: {
        type: String,
        minlength: [10,"email corto"],
        maxlength: [40,"email largo"],
        required: [true, "se requiere email"],
        unique: [true, "no se puede repetir email"]
    },
    password: {
        type:String,
        required: [true,"se requiere password"]
    },
    picture:{
        type:String,
        required: [true,"se requiere una imagen"]
    },
    role:{
        type:String,
        required: [true,"elige un rol"]
    }
});

var usuarios = mongoose.model("usuarios",modelSchema);
module.exports = usuarios;