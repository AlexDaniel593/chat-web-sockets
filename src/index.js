const express = require('express');
const { createServer } = require('http');
const realTimeServer = require('./realTimeServer');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const httpServer = createServer(app);

app.set('port', process.env.PORT || 3000);
const host = process.env.HOST || '0.0.0.0';
app.set('views', path.join(__dirname, 'views')); // src\views

app.use(cookieParser());
app.use(require("./routes"));

app.use(express.static(path.join(__dirname, 'public'))); // src\public

httpServer.listen(app.get('port'), host, () => { // funcion anonima o flecha
    console.log(`Server running on http://${host}:${app.get('port')}`); 
});

realTimeServer(httpServer);
