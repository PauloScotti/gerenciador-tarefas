const jwt = require('jsonwebtoken');

class LoginService {
    logar(login, senha) {
        // TODO: verificar se o usuário está cadastro no BD
        const usuario = {
            id: 1,
            nome: 'Usuário Fake',
            email: 'email@blablabla.com'
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