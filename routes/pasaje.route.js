const pasajeCtrl = require('./../controllers/pasaje.controller');

const express = require('express');
const router = express.Router();

router.post('/', pasajeCtrl.createPasaje);
router.get('/', pasajeCtrl.getPasajes);
router.delete('/:id', pasajeCtrl.deletePasaje);
router.put('/:id', pasajeCtrl.editPasaje);
router.get('/:categoriaPasajero', pasajeCtrl.getPasajerosByCategoria);

module.exports = router;