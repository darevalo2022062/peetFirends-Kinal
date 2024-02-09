const { Schema, model } = require('mongoose');

const MascotaSchema = Schema({
    nombre: {
        type: String,
        required: [true, "El nombre de la mascota es obligatorio"]
    },
    especie: {
        type: String,
        required: [true, "La especie es obligatoria"]
    },
    raza: {
        type: String,
        default: "Desconocida"
    },
    edad: {
        type: String,
        default: "Desconocida"
    },
    estadoAdopt: {
        type: Boolean,
        default: false
    }
});

module.exports = model('Mascota', MascotaSchema)