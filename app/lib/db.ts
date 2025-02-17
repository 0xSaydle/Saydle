import { MongoClient } from 'mongodb'
import '../../global';

const uri = process.env.MONGODB_URI as string;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
    throw new Error('Add a MongoDB URI to the .env file');
}

if (process.env.NODE_ENV === 'development'){
    //In development mode, use a global variable to preserve the value across module reloads
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, { monitorCommands: true }); 
        client.on('commandStarted', started => console.log(started));
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else{
    //In production mode, it's recommended not to use a global variable
    client = new MongoClient(uri, { monitorCommands: true });
    client.on('commandStarted', started => console.log(started))
    clientPromise = client.connect()
}

export default clientPromise;