const express = require('express');
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
const notFound = require('./middleware/notfound');
const errorHandlerMiddleware = require('./middleware/error-handler');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 8000;

//middleware
app.use(express.static('./public'))
app.use(express.json());
app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

//routes
app.get('/hello', (req, res)=> {
    res.send('TASK MANAGER APP');
});

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log(`listening on ${port}`);
        });
    } catch(err) {
        console.log(`Failled to connect ${err}`);
    }
}

start();