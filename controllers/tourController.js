const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {

    console.log(`Tour id is: ${val}`);

    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'failed',
            message: 'Invalid ID'
        });
    }
    next();
};

exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing name or price'
        })
    }

    next();
}

//for get all tour
exports.getAllTours = (req, res) => {

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
exports.getTour = (req, res) => {

    console.log(req.params);

    //convert the string into number
    const id = req.params.id * 1;

    //we can use this find method on arrays
    //the find method will then do its that basically it will create an array which only
    //contains the element where this comparision here turns out to be true
    const tour = tours.find(el => el.id === id)

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })

}

//for post
exports.createTour = (req, res) => {
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
exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>'
        }
    })
}

//for delete
exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null
    });
}
