# npm install

# npm install nodemon --global

check once the starting point in the package.json file is same as "start" : "nodemon server.js"

# to start the app type npm start

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

# show dbs

it will basically show us all the databases that we have in MongoDB.

# show collections

it will show our collections that we created before.

# quit()

to quit from the mongo shell just type quit() and it will then exit it.
