module.exports = (req, res, next) => {
    const traceId = Math.ceil(Math.random() * 99999999);
    const logger = {
        error: (mensagem, ...parametrosExtras   ) => {
            console.error(`[ERROR] traceId=${traceId}, msg=${mensagem},`, ...parametrosExtras);
        },
        debug: (mensagem, ...parametrosExtras) => {
            console.log(`[DEBUG] traceId=${traceId}, msg=${mensagem},`, ...parametrosExtras);
        },
        info: (mensagem, ...parametrosExtras) => {
            console.info(`[INFO] traceId=${traceId}, msg=${mensagem},`, ...parametrosExtras);
        }
    }

    logger.info('requisição recebida', `url=${req.url}`, `metodo_http=${req.method}`);

    req.logger = logger;
    next();
}