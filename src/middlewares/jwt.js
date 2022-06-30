const jwt = require('jsonwebtoken');

const rotasPublicas = [
    {
        url: '/api/login',
        metodo: 'POST'
    },
    {
        url: '/api/docs*',
        metodo: 'GET'
    },
    {
        url: '/api/usuario',
        metodo: 'POST'
    }
]

module.exports = (req, res, next) => {
    req.logger.info('Verificando permissão de acesso a rota', `rota=${req.url}`);

    // verifica se a requisição recebida é de alguma rota publica
    const rotaPublica = rotasPublicas.find(rota => {
        const rotaPublicaContemWidcard = rota.url.indexOf('*') !== -1;
        const urlRrequisicaoContemParteDaRotaPublica = req.url.indexOf(rota.url.replace('*', '')) !== -1;

        return ( // os parentesis definem a prioridade de verificação das condições
            // verifica se a rota da requisição é identica
            rota.url === req.url
            || ( // ou a rota publica contem um '*' e a rota da requisição possui como parte da url a rota publica
                rotaPublicaContemWidcard
                && urlRrequisicaoContemParteDaRotaPublica
            )
        )
        && (rota.metodo === req.method.toUpperCase())
    });

    if (rotaPublica) {
        return next();
    }

    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({
            status: 401,
            erro: 'Acesso negado, você precisa enviar o header de autorização'
        });
    }

    const token = authorization.substr(7);
    if (!token) {
        return res.status(401).json({
            status: 401,
            erro: 'O token de acesso não foi informado'
        });
    }

    // vverificar se o tokenm é válido
    jwt.verify(token, process.env.CHAVE_SECRETA_JWT, (err, decode) => {
        if (err) {
            req.logger.error('Erro ao verificar o token JWT', `token=${token}`);
            return res.status(401).json({
                status: 401,
                erro: 'Acesso negado, problema ao decodificar o seu token de autorização'
            });
        }

        req.logger.debug('token jwt decodificado', `idUsuario=${decoded._id}`);
        // TODO: carregar o usuário a partir do BD
        const usuario = {
            id: decoded._id
        }

        // quem é o usuário autenticado
        req.usuario = usuario;
        next();
    })

}