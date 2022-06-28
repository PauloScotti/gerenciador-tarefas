const HttpController = require('./HttpController');

class LoginController extends HttpController {
    configurarRotas(baseURL) {
        this.express.post(`${baseURL}/login`, this.login.bind(this));
    }

    login(req, res) {
        if (!req.body || !req.body.login || !req.body.senha) {
            return res.status(400).json({
                status: 400,
                erro: "Parâmetros de entrada inválidos"
            });
        }
        res.json({
            token: 'token gerado pela api'
        });
    }

}

module.exports = LoginController;