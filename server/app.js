const express = require("express");
const cors = require("cors");
const xss = require("xss-clean");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoSanatize = require('express-mongo-sanitize');
require("dotenv").config();
const { auth , subs} = require('./router');

const app = express();
app.use(mongoSanatize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./app/view"));
app.use(helmet());
app.use(cors());
app.use(xss());

app.use(morgan("combined"));


//ROUTER
app.use('/api/auth', auth);
app.use('/api/subscription',subs)


module.exports = app;
