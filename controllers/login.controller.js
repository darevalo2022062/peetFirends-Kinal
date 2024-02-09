const { response } = require('express');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');
const Mascota = require('../models/mascota');
const Usuario = require("../models/usuario");
const Login = require('../models/login');

const loginGet = async (req, res = response) => {
    const { correo, password } = req.body;
    const query = { estado: true };
    var comproba = false;
    const [usuarios] = await Promise.all([
        Usuario.find(query)
    ]);

    usuarios.forEach(element => {
        
        const decryptedPass = cryptr.decrypt(element.password);
        if (element.correo == correo && decryptedPass == password) {
            //TIENE Accesso
            comproba = true;
        }
    });

    if (comproba == true) {
        res.status(200).json({
            msg: `SE INICIO SESION, BIENVENIDO`
        });
    } else {
        res.status(400).json({
            msg: `TUS DATOS NO COINCIDEN CON NADA EN LA BASE DE DATOS`
        });
    }


}

module.exports = {
    loginGet
}