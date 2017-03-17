'use strict'

// libraries
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const MongoClient = require('mongodb').MongoClient;

const index = require('./routes/index');
const users = require('./routes/users');

// app connection setup
const PORT = 8080;
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/test';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', favicon.ico)));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.get('/db', (req, res) => {
    MongoClient.connect(mongoUrl, (err, db) => {
       if(err){
           res.writeHead(500, {'Content-Type': 'text/plain'});
           res.end('Ha ocurrido un error: ' + err);
        } else{
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Conexion exitosa a la base de datos');
            db.close();
        }
    });
});
// catch 404 and forward to error handler
app.use((req, res, next) => {
   let err = new Error('Not Found');
   err.status = 404;
   next(err);
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development'? err: {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(PORT);
console.log("Running on http://localhost:" + PORT);

module.exports = app;
