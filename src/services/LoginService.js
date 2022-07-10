const jwt = require('jsonwebtoken');
const md5 = require('md5');
const UsuarioRepository = require('../repositories/impl/MongoDBUsuarioRepository');

class LoginService {
    async logar(login, senha) {
        const filtro = {
            email: login,
            senha: md5(senha)
        }

        let usuario = null;

        const usuarios = await UsuarioRepository.filtrar(filtro);
        if (usuarios && usuarios.length) {
            usuario = usuarios[0];
        } else {
            return null;
        }
        
        //gera o token de acesso com JWT
        const token = jwt.sign({ _id: usuario.id }, process.env.CHAVE_SECRETA_JWT);

        // devolve as informações do usuário com o token de acesso
        return {
            ...usuario,
            token
        }
    }
}

module.exports = LoginService;