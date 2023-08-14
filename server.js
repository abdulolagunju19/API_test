const { MongoClient } = require('mongodb');

var express = require('express');
const connectToDatabase = require('./mongo');

var bodyParser = require('body-parser');

var app = express();

//parsing incoming json bodies
app.use(bodyParser.json({ type: 'application/json' }));

const { body, validationResult } = require('express-validator');

//variable router, express.Router() instantiates the router objet
//specify the routes we want to accept, specify the paths for the route
var usersRouter = express.Router();

//specify pages the server will respond to

//listening for post request on home page
usersRouter.post('/',
    body('username').isLength({ min: 5}),
    body('firstName').isLength({ min: 5}),
    body('email').isEmail(),
    async function (req, res) {
        const uri = 'mongodb://127.0.0.1:27017/restDatabase';
        const client = new MongoClient(uri);

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({ Errors: errors.array() });
        }

        var userData = {
            username: req.body.username,
            firstName: req.body.firstName,
            email: req.body.email
        };



        var collection = await connectToDatabase();
        
        try {
            collection.insertOne(userData);
            res.statusCode = 201;
            res.send(userData);
        } catch (error) {
            console.error('Could not insert user to database. Error: ', error);
            res.statusCode = 500;
            res.json({ errors: ['Could not add user']});
        }
        client.close()

});

async function findUser (req, res, next) {
    const uri = 'mongodb://127.0.0.1:27017/restDatabase';
    const client = new MongoClient(uri);

    var uniqueIdentifier = req.params.username;

    var collection = await connectToDatabase();

    try {
        var users = await collection.find({ username: uniqueIdentifier }).toArray();
        if (users && users.length === 0){
            res.statusCode = 404;
            res.send({ message: 'This user does not exist.'});
        }
        req.user = users[0];

        next();
    } catch (error) {
        console.error(error);
        res.statusCode = 500;
        return res.json({ errors: ['Could not find user']});
    }
    client.close();
}

//call the .get function on the router object, we will get an element by its id from the parameter from its url
usersRouter.get('/:username', findUser, function(req, res) {
    res.json(req.user);
});

//the usersRouter will be using the homepage '/users' and the pages with an id parameter
app.use('/users', usersRouter);

module.exports = app;