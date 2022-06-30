const HttpController = require('./HttpController');
const LoginService = require('../services/LoginService');

class LoginController extends HttpController {
    configurarRotas(baseURL) {
        this.express.post(`${baseURL}/login`, this.login.bind(this));
    }

    login(req, res) {
        const body = req.body;
        if (!body || !body.login || !body.senha) {
            req.logger.info('requisição de login inválida');
            return res.status(400).json({
                status: 400,
                erro: "Parâmetros de entrada inválidos"
            });
        }

        const service = new LoginService();
        const resultado = service.logar(body.login, body.senha);

        req.logger.info('requisição de login realizada com sucesso', `resultado=${JSON.stringify(resultado)}`);
        res.json(resultado);
    }

}

module.exports = LoginController;