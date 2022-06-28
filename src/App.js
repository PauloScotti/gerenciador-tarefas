const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger/swagger.json');
const LoginController = require('./controllers/LoginController');
const AppConstants = require('./enum/AppConstants');

class App {
    #controllers;


    iniciar() {
        //configurar express
        this.#configurarExpress();

        //carregar os controllers
        this.#carregarControllers();

        //iniciar o servidor
        this.#iniciarServidor();
    }

    #configurarExpress = () => {
        //cria a instancia do express para gerenciar o servidor
        this.express = express();

        // registra os middlewares para fazer a conversão das requisições da API
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(express.json());

        this.express.use(
            `${AppConstants.BASE_API_URL}/docs`,
            swaggerUi.serve,
            swaggerUi.setup(swaggerFile)
            );

        // registra os middlewares para fazer log das requisições
        this.express.use((req, res, next) => {
            console.log(`requisição recebida, url=${req.url}, método http=${req.method}`);
            next();
        })
    }

    #carregarControllers = () => {
        // atribui para a propriedade #controllers a lista de controllers disponíveis para a aplicação
        this.#controllers = [
            new LoginController(this.express)
        ];
    }

    #iniciarServidor = () => {
        // tenta pegar a porta a partir da variavel de ambiente EXPRESS_PORT
        // se não tiver definida, vai usar a porta 3001
        const port = process.env.EXPRESS_PORT || 3001;
        this.express.listen(port, () => {
            console.log(`Aplicação executando na porta ${port}`);
        })
    }
}

module.exports = App;