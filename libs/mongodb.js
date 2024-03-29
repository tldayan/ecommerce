

import { MongoClient } from "mongodb";

const URI = process.env.MONGODB_URI;
const options = {};

let client;

async function connectToMongo() {
  if (!client) {
    client = new MongoClient(URI, options);
    await client.connect();
  }
  return client;
}

const clientPromise = connectToMongo();

export default clientPromise;
