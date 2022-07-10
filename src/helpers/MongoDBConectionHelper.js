const mongoose = require('mongoose');

class MongoDBConectionHelper {
    static conectar() {
        const conexao = mongoose.connect(process.env.MONGO_DB_STRING_CONEXAO, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        mongoose.connection.on('connected', () => console.log('Conectado ao MongDB'));

        mongoose.connection.on('error', e => console.log('Erro ao conectar com o MongDB', e.message));

        return conexao;
    }
}

module.exports = MongoDBConectionHelper;