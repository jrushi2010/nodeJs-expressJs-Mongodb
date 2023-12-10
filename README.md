# npm install

# npm install nodemon --global

check once the starting point in the package.json file is same as "start" : "nodemon server.js"

to start the app type

# npm start

-------------------------------- # mongoDB # ----------------------------

# install mongo db -> www.mongodb.com

then click on products and then you need to click on MongoDB Server
now once again click on download button and once again choose server
choose current release and your os to download it.
after download you need to install it on your pc

after mongodb installation first you need to create a directory in which MongoDB will store our data.

for this open you file manager and go to disk in which your mongodb is installed in my case its Local Disk C.

Here create a directory called data, now inside this data folder create another one called DB, so this is the place where mongoDB will store our database.

to run this mongod server from any directory, so need to find a way to tell windows to look for this fill in that bin directory where we installed mongoDB.

and we can actually do this using system variables, and for this open windows settings -> go to edit system environment variables -> advance tab -> system variables -> we are instrested in system variables -> click on edit -> click on New -> and add the path where we installed mongodb

c:\Program Files\MongoDB\Server\4.0\bin

then click ok.

and then to test it, open command prompt and type

# mongod.exe

it will start our mongoDB server on default port 27017
now to use mongoDB you need to open another command prompt and type

# mongo

after typing mongo that will open up the mongo shell

to create new database use "use dbname" command

# use dbname

it will create the new database and it also switched to it, if the database with the same name is already available then it will only switch to it.

now remember inside a database we have collections and then each collection has documents in it, and the data we will create in mongo shell is always documents and so of course we have to create the document inside of a collection and so we specify that collection before we insert a document and it works like this.

# db.tours.insertOne({name: "The Forest Hiker", price: 297, rating: 4.7})

so here db is the current database then we specify the name of the collection and then on that we use the insertOne function.

so remember that mongoDB uses BSON, which is quite simmiler to JSON and so we can actually simply pass a javascript object into this insertOne function and it will then convert it into JSON and BSON.

and then hit enter, so just like this we created our first document in our database. ok just like to check that just use

# db.tours.find()

to view all the documents

# show dbs

it will basically show us all the databases that we have in MongoDB.

# show collections

it will show our collections that we created before.

# quit()

to quit from the mongo shell just type quit() and it will then exit it.

# db.tours.insertMany([{},{}])

to insert many documents

Querying(Reading) documents

# db.tours.find({name: "The Forest Hiker"})

# db.tours.find({difficulty: "easy"})

# db.tours.find({price: {$lte: 500}})

lte stands for less than or equal, because that is what we are searching for where the price less than 500.

# db.tours.find({ price: {$lt: 500}, rating: {$gte: 4.8} })

querying for documents where these two conditions are both true.

lte -> less than or equal to
lt -> less than
gte -> greater than or equal to
gt -> greater than

# db.tours.find({ $or: [ { price: {$lt: 500}, rating: {$gte: 4.8} } ] })

we start with the or operator and the or operator accepts an array of conditions. so we want either price filter to be true, or rating.

# db.tours.find({ $or: [ { price: {$lt: 500}, rating: {$gte: 4.8} } ] }, {name: 1})

that means we want only the name in to the output and so thats why we set name to one. all the others are not gonna appear in this case.

# db.tours.updateOne({name: "The Snow Adventurer"}, { $set: {price: 597} })

it will update price in the document which have the same name in the query,

# db.tours.updateMany( { price: {$gt: 500}, rating: {$gte: 4.8} }, {$set: {premium: true} } )

it will update the all documents with premium is true, which has price grater than 500 and rating greater than or equal to 4.8.

# db.tours.deleteOne()

# db.tours.deleteMany({ rating: {$lt: 4.8} })

# db.tours.deleteMany({})

it will delete all of the documents.

--------------------------- Mongo db using compass ---------------------

go to download page in mongodb.com

choose Tools from the download center then select compass

download the stable version, choose your platform and download and install the compass on your pc.

now open up the mongo db compass after that go to New Connection, now in order to create the connection to your local database make sure that you have local mongo server that running in the background.

the default port of the mongo local server is the 27017, and then type the hostname as localhost and then click on connect.

after that you can see all the databases that we locally have on your computer, then you can open database that you want and then you can view all the collections.

Now you can insert or filter the documents using the compass.

-------------------Creating a Hosted Database with atlas-----------------

its free, you have to just create a new account on mongodb atlas

so after login in your atlas, click on new project then type your project name and then click on next and then click on create project.

now the project is created now its time to deploy it on cloud, and for this go to overview tab or click on create a deployment button and then choose your cloud provider and then click on create.

now you have a blank empty database is ready to connect to your own development computer.

-----------------------connecting to Hosted Database---------------------

now click on connect button, but before this step you need to add your current ip address in to the atlas and for this go to Network Access tab inside the SECURITY tab and then add your current ip address.

after that you have to add a new user in to this and for this you have to go in to database access option which is inside the SECURITY TAB, then click on ADD NEW DATABASE USER and then add a username and password and the click on add user.

After that go to node js project and open your config.env file and add your Database_Password in this env file.

Now click on connect button inside the overview option, select the mongodb compass and then copy the conection string.

Open the mongodb compass and go to new connection and pest the connection string, and type the password and then click on connect.

# Connecting Our Database with the express App

to connect with hosted database we need a connection string, and for this go to mongo db atlas and click on connect button inside the overview option of the specific database, then select the driver option and then select the node js inside the driver and the perticular version and then copy the connection string.

after that go back to the node js app and copy the string inside the config.env file and save it in the variable name.

for local database use like this-

mongodb://localhost:27017/natours

next step that we need to install the mongo db driver so, our application allow access to intract with a mongodb database.

and there are couple of drivers available, but we are going to use mongoose.

# npm i mongoose@5

after installation, go to the server.js file and use the mongoose to connect the application with the database using connect method.

WHAT IS MONGOOSE? AND WHY USE IT?
Mongoose is an Object Data Modeling library for MongoDB and Node.js a higher level of abstraction.

Mongoose allows for rapid and simple development of mongoDB database iteractions.

Features: schemas to model data and relationships, easy data validation, simple query API, middleware , etc.

Mongoose schema: where we model our data, by describing the structure of the data, default values and validation.

Mongoose model: a wrapper for the schema, providing an interface to the database for CRUD opertions.

----------------------------Creating a simple Tour Model-----------------

const tourSchema = new mongoose.Schema({
name: {
type: String,
required: [true, 'A tour must have a name'],
unique: true
},
rating: {
type: Number,
default: 4.5
},
price: {
type: Number,
required: [true, 'A tour must have a price']
}
});

const Tour = mongoose.model('Tour', tourSchema);

----------------------Creating Documents and Testing the Model-----------

const testTour = new Tour({
name: 'The Forest Hiker',
rating: 4.7,
price: 497
});

testTour.save().then(doc => {
console.log(doc);
}).catch(err => {
console.log('error : ', err)
});

# Post Method

-----------------------Create documents using nodejs and Mongodb---------

http://localhost:5000/api/v1/tours

{
"name": "The Snow Adventure",
"price": 697,
"rating":4.8
}

# Get method

------------------------Reading Documents--------------------------------

for get all -
http://localhost:5000/api/v1/tours

for get using id -
http://localhost:5000/api/v1/tours/655b39382f43afbed0f6f2ce

# patch method

-------------------------Updating Documents------------------------------

for update method -
http://localhost:5000/api/v1/tours/655b39382f43afbed0f6f2ce

{
"price":500
}

# Delete method

--------------------------Deleting Documents-----------------------------

for delete method -
http://localhost:5000/api/v1/tours/655b5d48c4f41bdf00891813

# importing Development data from file system

for import
node dev-data/data/import-dev-data.js --import

for delete
node dev-data/data/import-dev-data.js --delete

# making the api better - filtering for getall method

http://localhost:5000/api/v1/tours?duration=5&difficulty=easy

so we want to allow the user to filter the data, so that instead of getting all the data, he only gets the data that matches the filter using query string.

console.log(req.query);
req.query should give us an object nicely formatted with the data from the query string, so we will get the output as

{ duration: '5', difficulty: 'easy' }

in mongoose there are actually two ways of wrting database queries.

so with the filter object we will do it like this,

const tours = await Tour.find({
duration: 5,
difficulty: 'easy'
});

in another way ---

const tours = await Tour.find()
.where('duration')
.equals(5).
.where('difficulty')
.equals('easy')

so our basic filter is now actually working, now the problem with this implementation is that its actually way too simple, and thats because later on we will have other query parameters. like for example sort, for sorting functionality, or page for pagination. and for this we need to make sure we are not querying for these in our databases.

for example if we added here page =2 then we would of course not get any result,

http://localhost:5000/api/v1/tours?difficulty=easy&page=2

because there is no document in this collection, where page is set to two, so we only want to use this page parameter here or this field page to implement pagination and not to actually query in the database.

and so what we have to do is to basically exclude these special field names from our query string before we actually do the filtering.

so what we will do is first we will create a shallow copy of the
req.query object.

        const queryObj = { ...req.query }

        here we need really a hard copy, so we cant just like req.query because then if you would delete something from this object we would also delete it from the req.query object and thats because in javascript when we set a varibale to another object, then that new variable will basically just be a reference of that original object.

        and thats why we first use destructring ...req.query and then we can simply create a new object out of that.

        just like this {...req.query} , these tree dots will basically take all the fields out of the object, and here with the curly brases we simply create a new object.

        now lets create an array of all the fields that we want to exclude
        const exccludedField = ['page', 'sort', 'limit', 'fields'];

        next what we need to do is to basically removes all of these fields from our query object. and in order to do that we will loop over these fields.

        exccludedField.forEach(el => delete queryObj[el])

filtering for get all method
http://localhost:5000/api/v1/tours?difficulty=easy&page=2&sort=1&limit=10

# Advanced filtering for getall method

right now user can only filter the documents by setting one key equal to a value, but now we actually also want to implement the greater than, the greater or equal than, the less than and the less or equal than operators.

    { duration: { $gte: 5 }, difficulty: 'easy' }

    http://localhost:5000/api/v1/tours?duration[gte]=5&difficulty=difficult

    console.log(req.query);
    if we use above path in postman then we will get output like this -
    { duration: { gte: '5' }, difficulty: 'easy' }

    so what we see here is that the query object, looks almost identical to the filter object, that we wrote manually, the only difference is that in this one we have the MongoDB operator sign '$' here like this.

     let queryStr = JSON.stringify(queryObj);
     so first i am going to convert the object into a string.

     now we want to replace the string with $
     queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

filtering for get all method using gte,gt,lte,lt
http://localhost:5000/api/v1/tours?duration[gte]=5&difficulty=difficult&price[lt]=1500

# added sorting functionality to the getall method

sow if we want to sort the tours with the low price

        let query = Tour.find(JSON.parse(queryStr))

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            // console.log(sortBy)
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

sorting for price and ratingsAverage
http://localhost:5000/api/v1/tours?sort=-price,ratingsAverage

# limiting the fields

so basically in order to allow clients to choose which fields they want to get back in the response, so for the client its always ideal to receive as little data as possible in order to reduce the bandwidth that is consumed with each request and so its a very nice feature to allow the API user to only request some of the fields.

        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields)
        } else {
            query = query.select('-__v');
        }

limiting fields-
http://localhost:5000/api/v1/tours?fields=name,duration

# added pagination

so bascially allowing the user to only select a certain page of our results, in case we have a lot of results.

so lets say if we want pgae 2 and there will be a limit field and this limit here basically means the amount of results that we want per page.

        const page = req.query.page * 1 || 1;

        const limit = req.query.limit * 1 || 100;

        const skip = (page - 1) * limit;
                page 3 starts from 21 so we want to skip 20 results, and if we set limit = 10 then
                skip = (3 -1) * 10 so we will get skip = 20.

        //page=3&limit-10, 1-10, page 1, 11-20, page 2, 21-30 page 3
        //query = query.skip(10).limit(10)
        query = query.skip(skip).limit(limit)

        if (req.query.page) {
            const numTours = await Tour.countDocuments();
            if (skip >= numTours) throw new Error('This page does not exist')
        }

for pagination
http://localhost:5000/api/v1/tours?page=2&limit=3

# Aliasing - top 5 cheap tour

tourRoutes.js -

router
.route('/top-5-cheap')
.get(tourController.aliasTopTours, tourController.getAllTours);

tourController.js -

exports.aliasTopTours = (req, res, next) => {
req.query.limit = '5';
req.query.sort = '-ratingsAverage,price';
req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
next();
}

# Aggregation Pipeline: Matching and Grouping

The aggreagtion pipeline really ia a MongoDB feature, but mongoose gives the access to it so that we can use it in the Mongoose driver.

    The difference here is that in aggregations, as i already mentioned, we can manupulate the data in a couple of different steps so lets now actually define the steps.

    and for that we pass array of so called stages, so i am gona start with match and match is basically to select or to filter certain documents. its really just like a filter object in MongoDB.

    so each of the stages is an object and then here comes the name of the stages.

         {
                $match: { ratingsAverage: { $gte: 4.5 } }
         }

         so we only want to select documents which have a ratings average greater or equal than 4.5.

    and usually this match stage is just a preliminary stage to then prepare for the next stages which come ahead.

        so the next one is now a group stage

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

        this group here is where the real magic happens because as the name says, it allows us to group documents together, basically using accumulators. and an accumulator is for example, even calculating an average.

        so if we have five tours, each of then has a rating, we can then calculate the average rating using group.


    exports.getTourStats = async (req, res) => {
    try {
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
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err
        });
    }

}

    tourRoutes.js -

    router
    .route('/tour-stats').get(tourController.getTourStats);


    http://localhost:5000/api/v1/tours/tour-stats

# Virtual Properties

now virtual properties are basically fields that we can define on our schema but that will not be persisted. so they will not be saved into the database in order to save us some space there.

and most of the time, of course, we want to really save our data to the database, but virtual properties make a lot of sense for fields that can be derived from one another. for example a conversion from miles to kilometers, it dosent make sense to store these two fields in a database if we can easily convert one to the other.

so lets now define a virtual property that contains the tour duration in weeks. so that a field basically that we can very easily convert from duration that we already have in days

# Document Middleware

Now just like Express we can use Mongoose middleware to make something happen bwteen two events.

There are 4 types of middleware in Mongoose: document, query, aggregate and model middleware.

    //document middleware: runs before .save() and .create()
    tourSchema.pre('save', function () {
        console.log(this)
    });

and this is for pre middleware which again run before an actual event and that event in this case is the save event, and so the callback function that we're gonna define here next, so this function will be called before an actual document is saved to the database.

# Query Middleware

as the name says query middleware allows us to run functions before or after a certain query is executed.
so basically a middlware is gona run before any find query is executed.

# Aggregation Middleware

it allows us to add hooks before or after an aggregation happens,

# Data Validation: Built-In Validators

validation is basically checking if the entered values are in the right format for each field in our document schema and also that values have actually been entered for all of the required fields.

now on the other hand we also have sanitization, which is to ensure that the inputed data is basically clean, so that there is no malicious code being injected into our database or into the application itself.

so in that step we remove unwanted characters or even code from the input data. so this is the golden standard step in the backend development to never ever accept input data comming from user as it is, so we always need to sanitize that incoming data.

    maxlength: [40, 'A tour name must have less or equal than 40 characters'],
        minlength: [10, 'A tour name  must have more or equal then 10 characters']

     enum: {
            values: ['easy', 'average', 'difficult'],
            message: 'Difficulty is either: easy, average, difficult'
        }
