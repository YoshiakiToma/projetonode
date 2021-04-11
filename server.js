const mongoose = require('mongoose');

require('dotenv').config({ path: 'variables.env' });

// Connection to database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false
});

// PODE USAR ECMA SCRIPT 6
mongoose.Promise = global.Promise;
mongoose.connection.on('error', () => {
    console.error("ERRO: " + error.message);
});

// Carregar todos os models
require('./models/Post');

const app = require('./app');

app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
    console.log("Servidor rodando na porta: " + server.address().port);
});