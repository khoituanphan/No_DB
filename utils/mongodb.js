const { MongoClient } = require('mongodb');

async function connectToDatabase() {
    const client = new MongoClient(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    if (!client.isConnected()) await client.connect();
    
    const db = client.db('myFirstDatabase'); // the name of your database

    return { db, client };
}

module.exports = {
    connectToDatabase,
};
