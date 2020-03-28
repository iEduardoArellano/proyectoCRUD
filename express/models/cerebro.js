var mongoose = require('mongoose');

var modelSchema = mongoose.Schema({
    flavor: {
        type:String,
        minlength: [3,"sabor corto"],
        maxlength:[20,"sabor largo"],
        required: [true,"se requiere sabor"]
    },
    description: {
        type:String,
        minlength: [6,"descripcion corta"],
        maxlength: [30,"descripcion larga"],
        required: [true,"se requiere descripcion"]
    },
    iq: {
        type: Intl,
        minlength: [1, "iq muy chiquito"],
        maxlength: [4,"iq muy grande"],
        required: [true, "se requiere iq"]
    },
    picture: {
        type:String,
        required: [true,"se requiere foto"]
    }
});

var cerebro = mongoose.model("cerebros",modelSchema);
module.exports = cerebro;