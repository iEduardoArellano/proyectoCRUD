var mongoose = require('mongoose');

var modelSchema = mongoose.Schema({
    name:{
        type: String,
        minlength: [3,"nombre muy corto"],
        maxlength: [30,"nombre muy largo"],
        required: [true, "se requiere nombre"]
    },
    email: {
        type:String,
        required: [true,"se requiere email"]
    },
    type: {
        type:String,
        enum: ["Alumno","Maestro"],
        required: [true, "se requiere tipo"]
    }
});

var Zombie = mongoose.model("Zombie",modelSchema);
module.exports = Zombie;