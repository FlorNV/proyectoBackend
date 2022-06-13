const transaccionCtrl = require('./../controllers/transaccion.controller');

const express = require('express');
const router = express.Router();

router.post('/', transaccionCtrl.createTransaccion);
router.get('/', transaccionCtrl.getTransacciones);
router.get('/historico', transaccionCtrl.getHistorico);
router.get('/por-moneda', transaccionCtrl.getTransaccionesByMoneda);

module.exports = router;
