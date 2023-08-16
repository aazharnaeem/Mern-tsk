const app = require('./app');
const connection = require('./config/db')
const logger = require('./config/logger');



let server;
const PORT = process.env.PORT || 8000;
connection.on('connected', () => {
    logger.info('MongoDB connected');
})
server = app.listen(PORT, () => {
    logger.info(`Server started on port ${PORT}`);
})
app.get('/', (req, res) => {
    logger.info('/ hit')
    // res.send('Hello World');
    res.sendFile(__dirname + '/view/index.html');
});

app.use('*', (req, res) => {
    res.status(404).send({ message: 'route not found', sucess: false });
})


const exitHandler = (options, err) => {
    if (options.cleanup || err) {
        server.close(() => {
            logger.info('Server closed');
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }

}

const unexpectedHandler = (err) => {
    logger.error(err.stack);
    // exitHandler({ cleanup: true }, err);
}
process.on('uncaughtException', unexpectedHandler);
process.on('unhandledRejection', unexpectedHandler);

process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    // exitHandler({ cleanup: true });
})