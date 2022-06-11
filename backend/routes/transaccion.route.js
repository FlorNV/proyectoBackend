const transaccionCtrl = require('./../controllers/transaccion.controller');

const express = require('express');
const router = express.Router();

router.post('/', transaccionCtrl.createTransaccion);
router.get('/', transaccionCtrl.getTransacciones);
// router.get('/historico/:emailCliente', transaccionCtrl.getHistorico);
router.get('/historico', transaccionCtrl.getHistorico);
router.get('/:origen&:destino', transaccionCtrl.getTransaccionesByMoneda);
// router.get('/', transaccionCtrl.getTransaccionesByMoneda);

module.exports = router;
