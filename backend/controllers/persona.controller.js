const Persona = require('../models/persona');
const personaCtrl = {}

personaCtrl.createPersona = async (req, res) => {
    var persona = new Persona(req.body);
    try {
        await persona.save();
        res.status(200).json({
            'status': '1',
            'msg': 'Persona guardada.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error al procesar la operación.'
        })
    }
}

personaCtrl.getPersonas = async (req, res) => {
    var personas = await Persona.find();
    res.json(personas);
}

personaCtrl.getPersona = async (req, res) => {
    try {
        var persona = await Persona.findById(req.params.id);
        res.json(persona);
    } catch (error) {
        res.status(404).json({
            'status': '0',
            'msg': 'No encontrado.'
        })
    }
}

module.exports = personaCtrl;