const Transaccion = require('./../models/transaccion');
const transaccionCtrl = {}

transaccionCtrl.createTransaccion = async (req, res) => {
    var transaccion = new Transaccion(req.body);
    try {
        await transaccion.save();
        res.status(200).json({
            'status': '1',
            'msg': 'Transaccion guardada.'
        })
    } catch (error) {
        
    }
}

transaccionCtrl.getTransacciones = async (req, res) => {
    var transacciones = await Transaccion.find();
    res.json(transacciones);
}

transaccionCtrl.getHistorico = async (req, res) => {
    var historico = await Transaccion.find({emailCliente: req.query.email});
    res.json(historico);
}

transaccionCtrl.getTransaccionesByMoneda = async (req, res) => {
    criteria = {monedaOrigen: req.query.origen, monedaDestino: req.query.destino}
    var transacciones = await Transaccion.find(criteria);
    res.json(transacciones);
}

module.exports = transaccionCtrl;