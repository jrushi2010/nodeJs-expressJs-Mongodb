const fs = require('fs');
const express = require('express');
const morgan = require('morgan');


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

// app.get('/', (req, res) => {
//     res
//         .status(200)
//         .json({ message: 'hello from the server side', app: 'Natourse' });
// });

// app.post('/', (req, res) => {
//     res.send('you can post to this endpoint...');
// })

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//for get all tour
const getAllTours = (req, res) => {

    console.log(req.requestTime);

    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    })
}

//for get single tour
const getTour = (req, res) => {

    console.log(req.params);

    //convert the string into number
    const id = req.params.id * 1;

    //we can use this find method on arrays
    //the find method will then do its that basically it will create an array which only
    //contains the element where this comparision here turns out to be true
    const tour = tours.find(el => el.id === id)

    if (!tour) {
        return res.status(404).json({
            status: 'failed',
            message: 'Invalid ID'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })

}

//for post
const createTour = (req, res) => {
    //console.log(req.body);

    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    tours.push(newTour);

    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        err => {
            res.status(201).json({
                status: "success",
                data: {
                    tour: newTour
                }
            });
        });
}

//for update
const updateTour = (req, res) => {

    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'failed',
            message: 'Invalid ID'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>'
        }
    })
}

//for delete
const deleteTour = (req, res) => {

    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'failed',
            message: 'Invalid ID'
        });
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
}

const getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
}

const createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
}

const getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
}

const updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
}

const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
}

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);


// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

//because of ? the y becomes a optional parameter
//http://localhost:5000/api/v1/tours/5/23
// app.get('/api/v1/tours/:id/:x/:y?', (req, res) => {});



app
    .route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour)

app
    .route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)

app
    .route('/api/v1/users')
    .get(getAllUsers)
    .post(createUser)

app
    .route('/api/v1/users/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)

const port = 5000;

app.listen(port, () => {
    console.log(`app running on port ${port}...`);
});