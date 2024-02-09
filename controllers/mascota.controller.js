const Mascota = require('../models/mascota');
const { response } = require('express');

//INGRESO DE MASCOTA
const mascotaPost = async (req, res) => {
    const { nombre, especie, raza, edad } = req.body;
    const mascota = new Mascota({ nombre, especie, raza, edad });

    await mascota.save();
    res.status(200).json({
        mascota
    });
}

//MOSTRAR MASCOTAS AUN EN "LUGAR"
const mascotasGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estadoAdopt: false };

    const [total, mascotas] = await Promise.all([
        Mascota.countDocuments(query),
        Mascota.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        mascotas
    });
}

//LlAMAR POR ID
const getMascotaByid = async (req, res) => {
    const { id } = req.params;
    const mascota = await Mascota.findOne({ _id: id });

    res.status(200).json({
        mascota
    });
}

//EDITAR
const mascotasPut = async (req, res) => {
    const { id } = req.params;
    const { especie, ...resto } = req.body;

    await Mascota.findByIdAndUpdate(id, resto);

    const mascota = await Mascota.findOne({ _id: id });

    res.status(200).json({
        msg: 'Mascota Actualizada exitosamente',
        mascota
    })
}

//ELIMINAR
const mascotasDelete = async (req, res) => {
    const { id } = req.params;
    await Mascota.findByIdAndUpdate(id, { estadoAdopt: true });

    const mascota = await Mascota.findOne({ _id: id });

    res.status(200).json({
        msg: 'Mascota eliminada exitosamente',
        mascota
    });
}

module.exports = {
    mascotaPost,
    mascotasGet,
    getMascotaByid,
    mascotasPut,
    mascotasDelete
}