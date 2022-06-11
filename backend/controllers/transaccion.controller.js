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
    console.log(req.query.email);
    // console.log(req.params.email);
    var historico = await Transaccion.find({emailCliente: req.query.email});
    // var historico = await Transaccion.find({emailCliente: req.params.email});
    res.json(historico);
}

transaccionCtrl.getTransaccionesByMoneda = async (req, res) => {
    var mOrigen = req.params.origen;
    var mDestino = req.params.destino;
    var transacciones = await Transaccion.find({monedaOrigen: mOrigen, monedaDestino: mDestino});
    res.json(transacciones);
}

module.exports = transaccionCtrl;