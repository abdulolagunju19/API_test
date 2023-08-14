//store the opening of the application
//start up server and open mongo database
var app = require('./server');

const connectToDatabase = require('./mongo')

const port = 3000;

try {
    connectToDatabase();

    app.listen(port, () => {
        console.log('Server started.');
    });

} catch (error) {
    console.error('Error: ', error);
}



