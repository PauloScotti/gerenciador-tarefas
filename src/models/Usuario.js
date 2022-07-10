const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const md5 = require('md5');

const mensagemErroObrigatorio = '*Campo obrigatório!';
const UsuarioSchema = new Schema({
    nome: {
        type: String,
        required: [true, mensagemErroObrigatorio]
    },
    email: {
        type: String,
        required: [true, mensagemErroObrigatorio]
    },
    senha: {
        type: String,
        required: [true, mensagemErroObrigatorio]
    }
});

UsuarioSchema.pre('save', function (next) {
    this.senha = md5(this.senha);
    next();
});

const Usuario = mongoose.model('usuario', UsuarioSchema);
module.exports = Usuario;