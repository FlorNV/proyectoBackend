const Transaccion = require('./../models/transaccion');
const transaccionCtrl = {}


/*
    -Dar de alta una Transaccion(POST)
    -Recuperar TODAS las Transacciones Registradas (GET)
    -Recuperar el histórico de transacciones de un determinado cliente (GET), utilizar email como clave
    -Recuperar TODAS las Transacciones que tengan como origen y destino las divisas (monedas) recibidas como parámetro (GET).
    Utilice el concepto de PARAMS.
    Nota: Ej. ARS-Argentina BRL-Brasil USD-EstadosUnid
*/


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
    var historico = await Transaccion.find({emailCliente: req.params.emailCliente});
    res.json(historico);
}

// transaccionCtrl.getTransaccionesByMoneda = async (req, res) => {
//     var mOrigen = req.params.monedaOrigen;
//     var mDestino = req.params.monedaDestino;
//     var transacciones = await Transaccion.find({monedaOrigen: mOrigen, monedaDestino: mDestino});
//     res.json(transacciones);
// }

module.exports = transaccionCtrl;