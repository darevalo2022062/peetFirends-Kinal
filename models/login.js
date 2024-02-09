const { Schema, model } = require('mongoose');

const LoginSchema = Schema({
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    estadoSesion: {
        type: Boolean,
        default: true
    }
});

module.exports = model('login', LoginSchema);