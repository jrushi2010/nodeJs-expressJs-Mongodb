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

filtering for get all method
http://localhost:5000/api/v1/tours?difficulty=easy&page=2&sort=1&limit=10

# Advanced filtering for getall method

filtering for get all method using gte,gt,lte,lt
http://localhost:5000/api/v1/tours?duration[gte]=5&difficulty=difficult&price[lt]=1500

# added sorting functionality to the getall method

sorting for price and ratingsAverage
http://localhost:5000/api/v1/tours?sort=-price,ratingsAverage
