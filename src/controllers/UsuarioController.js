const HttpController = require("./HttpController");

class UsuarioController extends HttpController {
    configurarRotas(baseUrl) {
        this.express.post(`${baseUrl}/usuario`, this.cadastrar.bind(this));
    }

    cadastrar(req, res) {
        const dadosUsuario = req.body;

        req.logger.info('Usuário cadastrado com sucesso');
        res.json(dadosUsuario);
    }
}

module.exports = UsuarioController;