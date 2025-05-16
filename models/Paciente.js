const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    edad: { type: Number, required: true },
    sangre: { type: String, required: true },
    padecimiento: { type: String, required: true },
    comentarios: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model('Paciente', pacienteSchema, 'pacientes');