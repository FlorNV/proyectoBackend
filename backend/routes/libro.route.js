const libroCtrl = require('./../controllers/libro.controller');

const express = require('express');
const router = express.Router();

router.post('/', libroCtrl.createLibro);
router.get('/', libroCtrl.getLibros);
router.delete('/:id', libroCtrl.deleteLibro);
router.put('/:id', libroCtrl.editLibro);
router.get('/destacados', libroCtrl.getLibrosDestacados);

module.exports = router;