require('dotenv').config();
const express = require('express');
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');

const app = express();
app.use(errorHandlerMiddleware);
app.use(notFound)
app.use(express.json());

app.get('/', (req, res) => {
    return res.send('Store Api')
})