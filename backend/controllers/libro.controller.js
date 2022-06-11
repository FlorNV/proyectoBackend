const Libro = require('./../models/libro');
const libroCtrl = {}

libroCtrl.createLibro = async (req, res) => {
    var libro = new Libro(req.body);
    try {
        await libro.save();
        res.status(200).json({
            'status': '1',
            'msg': 'Libro guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error al procesar la operación'
        })
    }
}

libroCtrl.getLibros = async (req, res) => {
    var libros = await Libro.find();
    res.json(libros);
}

libroCtrl.deleteLibro = async (req, res) => {
    try {
        await Libro.deleteOne({_id: req.params.id});
        res.status(200).json({
            'status': '1',
            'msg': 'Libro eliminado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error al procesar la operación'
        })
    }
}

libroCtrl.editLibro = async (req, res) => {
    const vLibro = new Libro(req.body);
    try {
        await Libro.updateOne({_id: req.body._id}, vLibro);
        res.status(200).json({
            'status': '1',
            'msg': 'Libro actualizado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error al procesar la operación'
        })
    }
}

libroCtrl.getLibrosDestacados = async (req, res) => {
    var criteria = {'destacado': true};
    var libros = await Libro.find(criteria);
    res.json(libros);
}

module.exports = libroCtrl;