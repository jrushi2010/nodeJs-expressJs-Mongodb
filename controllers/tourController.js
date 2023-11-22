//-----------------------------------------------new code based on Hosted DB Server-------------------------------------------------------------------------------
const Tour = require('../models/tourModel');

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

exports.getAllTours = async (req, res) => {
    try {

        //filtering
        // const tours = await Tour.find({
        //     duration: 5,
        //     difficulty: "easy"
        // })

        //filtering
        // const tours = await Tour.find()
        //     .where('duration')
        //     .equals(5)
        //     .where('difficulty')
        //     .equals('easy');

        //build query
        // 1) filtering
        const queryObj = { ...req.query }
        const exccludedField = ['page', 'sort', 'limit', 'fields'];
        exccludedField.forEach(el => delete queryObj[el])
        // const query = Tour.find(queryObj);
        // console.log(req.query);

        // 2) advance filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        // console.log(JSON.parse(queryStr));
        // { duration: { $gte: '5' }, difficulty: 'easy' }

        let query = Tour.find(JSON.parse(queryStr));

        // 3) Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            // console.log(sortBy)
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        // 4) field limiting
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields)
        } else {
            query = query.select('-__v');
        }

        // 5) pagination
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 100;
        const skip = (page - 1) * limit;

        //page=3&limit-10, 1-10, page 1, 11-20, page 2, 21-30 page 3
        query = query.skip(skip).limit(limit)

        if (req.query.page) {
            const numTours = await Tour.countDocuments();
            if (skip >= numTours) throw new Error('This page does not exist')
        }

        //Execute query
        const tours = await query;

        //send response
        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err
        })
    }
}


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

exports.getTour = async (req, res) => {

    try {
        const tour = await Tour.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err
        });
    }

};


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
exports.createTour = async (req, res) => {
    try {
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

    } catch (err) {
        //console.log(err);
        res.status(400).json({
            status: 'failed',
            message: 'Invalid data sent'
        })
    }
};

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
exports.updateTour = async (req, res) => {
    try {
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
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err
        });
    }

}

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
exports.deleteTour = async (req, res) => {
    try {

        await Tour.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err
        });
    }

}

//-----------------------------------------------new code based on Hosted DB Server-------------------------------------------------------------------------------
