const mongoose = require('mongoose');

const dotenv = require('dotenv');

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! Shuting down..');
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

// mongoose.connect(process.env.DATABASE_LOCAL, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false
// }).then(con => {
//     console.log(con.connections);
//     console.log('DB connection successfull');
// })



mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => console.log('DB connection successfull')).catch(err => console.log('ERROR'));

//console.log(app.get('env')); -> development
//console.log(process.env);

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
    console.log(`app running on port ${port}...`);
});

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! Shuting down..');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});


