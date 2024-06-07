const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

//Global middlewares
//1) set security HTTP headers
app.use(helmet())


//console.log(process.env.NODE_ENV);
//2) development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//3) limit requests from same API 
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Two many requests from this IP, please try agin in an hour!'
});

app.use('/api', limiter);


//middleware - is basically a function that can modify the incoming request data
//so its called middlewar because it stands between in the middle of the reuest and the response 
//4) body parser reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

//data sanitization against nosql query injection
app.use(mongoSanitize());

//data sanitization againt xss
app.use(xss());

// prevent parameter pollution
app.use(hpp({
    whitelist: ['duration', 'ratingsQuantity', 'ratingsAverage', 'maxGroupSize', 'difficulty', 'price']
}));

//5) serving static files
app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//     console.log('Hello from the middleware ')
//     next();
// });

// test middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log(req.headers);
    next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//always write this route in last point
app.all('*', (req, res, next) => {

    // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
    // err.status = 'failed';
    // err.statusCode = 404;

    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler)

module.exports = app;