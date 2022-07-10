module.exports = (Implementacao) => {
    if (!Implementacao.cadastrar) {
        throw new Error(`A classe ${Implementacao} não implementou o método cadastrar!`);
    }

    if (!Implementacao.filtrar) {
        throw new Error(`A classe ${Implementacao} não implementou o método filtrar!`);
    }

    if (!Implementacao.buscarPorId) {
        throw new Error(`A classe ${Implementacao} não implementou o método buscarPorId!`);
    }

    return Implementacao;
}