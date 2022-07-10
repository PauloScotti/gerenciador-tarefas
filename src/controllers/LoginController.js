const HttpController = require('./HttpController');
const LoginService = require('../services/LoginService');

class LoginController extends HttpController {
    configurarRotas(baseURL) {
        this.express.post(`${baseURL}/login`, this.login.bind(this));
    }

    async login(req, res) {
        try {
            const body = req.body;
            if (!body || !body.login || !body.senha) {
                req.logger.info('requisição de login inválida');
                return res.status(400).json({
                    status: 400,
                    erro: "Parâmetros de entrada inválidos"
                });
            }

            const service = new LoginService();
            const resultado = await service.logar(body.login, body.senha);
            if (!resultado) {
                return res.status(400).json({
                    erro: 'Login ou senha inválidos',
                    status: 400
                });
            }

            req.logger.info('requisição de login realizada com sucesso', `resultado=${JSON.stringify(resultado)}`);
            res.json(resultado);
        } catch (e) {
            req.logger.erro('Erro ao realizar login, erro=' + e.message);
            res.status(500).json({
                erro: 'Problema ao realizar o login. Tente novamente mais tarde',
                status: 500
            });
        }

    }

}

module.exports = LoginController;