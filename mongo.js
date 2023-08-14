const { MongoClient } = require('mongodb');

async function connectToDatabase() {
    const uri = 'mongodb://127.0.0.1:27017/restDatabase';
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('restDatabase');

        const collection = db.collection('users');

        return collection;
    } catch (error) {
        console.error('Error: ', error)
    }
}

module.exports = connectToDatabase;