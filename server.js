'use strict';

require('dotenv').config()
const express = require('express');
var routes = require('./routes');
require('./db.server')(process.env.DB_PORT);

// Constants
const PORT = process.env.APLICATION_PORT;
const HOST = process.env.APLICATION_HOST;

// App
const app = express();

app.use('/build', express.static('html/build'));
app.use('/assets', express.static('html/assets'));
app.use('/fonts', express.static('html/fonts'));
app.use('/node_modules', express.static('html/node_modules'));

/* NO ROUTES HERE TRATAMENTO PARA O VUE GERENCIAR MAS CUIDADO FUTURO PARA CASO DE POSTS OU TRATAMENTO DE FOTOS ETC */
app.use('*', routes);

app.listen(PORT, HOST);

console.log(`Running on \x1b[33mhttp://${HOST}:${PORT}\x1b[0m`);
console.log(`Or on \x1b[34mdocker\x1b[0m -> \x1b[33mhttp://${HOST}:${505}\x1b[0m`);