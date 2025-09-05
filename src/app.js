const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.json());
app.use(cors());
app.use('/', userRoutes);

module.exports = app;