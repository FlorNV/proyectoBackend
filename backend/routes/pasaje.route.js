const pasajeCtrl = require('./../controllers/pasaje.controller');

const express = require('express');
const router = express.Router();

router.post('/', pasajeCtrl.createPasaje);
router.get('/listado', pasajeCtrl.getPasajes);
router.delete('/:id', pasajeCtrl.deletePasaje);
router.get('/:id', pasajeCtrl.getPasaje);
router.put('/:id', pasajeCtrl.editPasaje);
router.get('/', pasajeCtrl.getPasajesByCategoria);

module.exports = router;