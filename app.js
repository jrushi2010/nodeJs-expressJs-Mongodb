const express = require('express');
const morgan = require('morgan');

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

app.use(morgan('dev'));

//middleware - is basically a function that can modify the incoming request data
//so its called middlewar because it stands between in the middle of the reuest and the response 
app.use(express.json());

app.use((req, res, next) => {
    console.log('Hello from the middleware ')
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;