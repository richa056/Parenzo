const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://Devananda:DEV1234@parent.fcqxirc.mongodb.net/?retryWrites=true&w=majority&appName=parent";

async function testConnection() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
    const db = client.db("parenzo");
    const collections = await db.listCollections().toArray();
    console.log("Available collections:", collections);
  } catch (error) {
    console.error("Connection error:", error);
  } finally {
    await client.close();
  }
}

testConnection(); 