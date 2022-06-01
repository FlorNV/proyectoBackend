const mongoose = require('mongoose');
const {Schema} = mongoose;

const LibroSchema = new Schema({
    titulo: {type: String, required: true},
    decripcion: {type: String, required: true},
    imagen: {type: String, required: true},
    stock: {type: Number, required: true},
    destacado: {type: Boolean, required: true}// solo algunos libros son destacados
})

module.exports = mongoose.models.Libro || mongoose.model('Libro', LibroSchema);