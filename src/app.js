import express from 'express';
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
import cors from 'cors'

var indexRouter = require('./routes/index.route');
var authRouter = require('./routes/auth.route');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())

app.use('/', indexRouter);
app.use('/auth', authRouter);

module.exports = app;
