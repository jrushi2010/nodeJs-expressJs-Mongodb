//-----------------------------------------------new code based on Hosted DB Server-------------------------------------------------------------------------------
const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');

const APIFeatures = require('../utils/apiFeatures');

exports.aliasTopTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
}

//-----------------------------------------------new code based on Hosted DB Server-------------------------------------------------------------------------------









//-----------------------------------------------old code based on file system-------------------------------------------------------------------------------

// const fs = require('fs');

// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );


// exports.checkID = (req, res, next, val) => {

//     console.log(`Tour id is: ${val}`);

//     if (req.params.id * 1 > tours.length) {
//         return res.status(404).json({
//             status: 'failed',
//             message: 'Invalid ID'
//         });
//     }
//     next();
// };

// exports.checkBody = (req, res, next) => {
//     if (!req.body.name || !req.body.price) {
//         return res.status(400).json({
//             status: 'fail',
//             message: 'Missing name or price'
//         })
//     }

//     next();
// }

//-----------------------------------------------old code based on file system-------------------------------------------------------------------------------












//-----------------------------------------------old code based on file system-------------------------------------------------------------------------------
//for get all tour

// exports.getAllTours = (req, res) => {

//     console.log(req.requestTime);

//     res.status(200).json({
//         status: 'success',
//         requestedAt: req.requestTime,
//         results: tours.length,
//         data: {
//             tours
//         }
//     })
// }

//-----------------------------------------------old code based on file system-------------------------------------------------------------------------------

//-----------------------------------------------new code based on Hosted DB Server-------------------------------------------------------------------------------



//for get all tour
exports.getAllTours = catchAsync(async (req, res, next) => {

    //Execute query
    const features = new APIFeatures(Tour.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .pagination();
    const tours = await features.query;

    //send response
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    })

});


//-----------------------------------------------new code based on Hosted DB Server-------------------------------------------------------------------------------












//-----------------------------------------------old code based on file system-------------------------------------------------------------------------------

//for get single tour

// exports.getTour = (req, res) => {

//     console.log(req.params);

//     //convert the string into number
//     const id = req.params.id * 1;

//     //we can use this find method on arrays
//     //the find method will then do its that basically it will create an array which only
//     //contains the element where this comparision here turns out to be true
//     const tour = tours.find(el => el.id === id)

//     res.status(200).json({
//         status: 'success',
//         data: {
//             tour
//         }
//     })

// }

//-----------------------------------------------old code based on file system-------------------------------------------------------------------------------

//-----------------------------------------------new code based on Hosted DB Server-------------------------------------------------------------------------------


//for get single tour

exports.getTour = catchAsync(async (req, res, next) => {


    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
});


//-----------------------------------------------new code based on Hosted DB Server-------------------------------------------------------------------------------















//-----------------------------------------------old code based on file system-------------------------------------------------------------------------------
//for post
// exports.createTour = (req, res) => {
//     //console.log(req.body);

//     const newId = tours[tours.length - 1].id + 1;
//     const newTour = Object.assign({ id: newId }, req.body);

//     tours.push(newTour);

//     fs.writeFile(
//         `${__dirname}/dev-data/data/tours-simple.json`,
//         JSON.stringify(tours),
//         err => {
//             res.status(201).json({
//                 status: "success",
//                 data: {
//                     tour: newTour
//                 }
//             });
//         });
// }

//-----------------------------------------------new code based on Hosted DB Server-------------------------------------------------------------------------------

exports.createTour = catchAsync(async (req, res, next) => {
    //console.log(req.body);
    // const newTour = new Tour({})
    // newTour.save()
    const newTour = await Tour.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            tour: newTour
        }
    });
});

//-----------------------------------------------new code based on Hosted DB Server-------------------------------------------------------------------------------
















//-----------------------------------------------old code based on file system-------------------------------------------------------------------------------


//for update
// exports.updateTour = (req, res) => {
//     res.status(200).json({
//         status: 'success',
//         data: {
//             tour: '<Updated tour here...>'
//         }
//     })
// }

//-----------------------------------------------old code based on file system-------------------------------------------------------------------------------


//-----------------------------------------------new code based on Hosted DB Server-------------------------------------------------------------------------------


//for update
exports.updateTour = catchAsync(async (req, res, next) => {

    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
});

//-----------------------------------------------new code based on Hosted DB Server-------------------------------------------------------------------------------


















//-----------------------------------------------old code based on file system-------------------------------------------------------------------------------


//for delete
// exports.deleteTour = (req, res) => {
//     res.status(204).json({
//         status: 'success',
//         data: null
//     });
// }

//-----------------------------------------------old code based on file system-------------------------------------------------------------------------------

//-----------------------------------------------new code based on Hosted DB Server-------------------------------------------------------------------------------

//for delete
exports.deleteTour = catchAsync(async (req, res, next) => {

    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: 'success',
        data: null
    });
});

//-----------------------------------------------new code based on Hosted DB Server-------------------------------------------------------------------------------

exports.getTourStats = catchAsync(async (req, res, next) => {

    const stats = await Tour.aggregate([
        {
            $match: { ratingsAverage: { $gte: 4.5 } }
        },
        {
            $group: {
                _id: { $toUpper: '$difficulty' },
                numTours: { $sum: 1 },
                numRatings: { $sum: '$ratingsQuantity' },
                avgRating: { $avg: '$ratingsAverage' },
                avgPrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' },
            }
        },
        {
            $sort: { avgPrice: 1 }
        },
        // {
        //     $match: { _id: { $ne: 'EASY' } }
        // }
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            stats
        }
    });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {

    const year = req.params.year * 1;

    const plan = await Tour.aggregate([
        {
            $unwind: '$startDates'
        },
        {
            $match: {
                startDates: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`),
                }
            }
        },
        {
            $group: {
                _id: { $month: '$startDates' },
                numTourStarts: { $sum: 1 },
                tours: { $push: '$name' }
            }
        },
        {
            $addFields: { month: '$_id' }
        },
        {
            $project: {
                _id: 0
            }
        },
        {
            $sort: { numTourStarts: -1 }
        },
        {
            $limit: 12
        }
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            plan
        }
    });


});