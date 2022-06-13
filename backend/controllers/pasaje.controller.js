const Pasaje = require('../models/pasaje');
const pasajeCtrl = {}

pasajeCtrl.createPasaje = async (req, res) => {
    var pasaje = new Pasaje(req.body);
    try {
        await pasaje.save();
        res.status(200).json({
            'status': '1',
            'msg': 'Pasaje guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error al procesar la operación.'
        })
    }
}

pasajeCtrl.getPasajes = async (req, res) => {
    var pasajes = await Pasaje.find().populate("pasajero");
    res.json(pasajes);
}

pasajeCtrl.deletePasaje = async (req, res) => {
    try {
        await Pasaje.deleteOne({_id: req.params.id});
        res.status(200).json({
            'status': '1',
            'msg': 'Pasaje Eliminado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error al procesar la operación.'
        })
    }
}

pasajeCtrl.getPasaje = async (req, res) => {
    try {
        var pasaje = await Pasaje.findById(req.params.id);
        res.status(200).json(pasaje);
    } catch (error) {
        res.status(404).json({
            'status': '0',
            'msg': 'No encontrado.'
        })
    }
}

pasajeCtrl.editPasaje = async (req, res) => {
    const vPasaje = new Pasaje(req.body);
    try {
        await Pasaje.updateOne({_id: req.body._id}, vPasaje);
        res.status(200).json({
            'status': '1',
            'msg': 'Pasaje Actualizado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error al procesar la operación.'
        })
    }
}

pasajeCtrl.getPasajesByCategoria = async (req, res) => {
    var pasajes = await Pasaje.find({categoriaPasajero: req.query.categoria}).populate("pasajero");
    res.json(pasajes);
}

module.exports = pasajeCtrl;