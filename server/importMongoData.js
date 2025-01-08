import { MongoClient, ObjectId } from 'mongodb';
import fs from 'fs/promises'; // Use fs.promises for async file operations
import { env } from './utils/env.mjs'; // Import environment variables from env.mjs

// MongoDB connection URI from env.mjs
const uri = env.MONGO_URI; // Replace with your MongoDB URI in env.mjs
const dbName = env.DB_NAME; // Replace with your database name in env.mjs

// Function to transform every $oid field into ObjectId
function transformObjectIds(data) {
  // Recursive function to traverse and transform $oid fields
  function transform(obj) {
    if (obj && typeof obj === 'object') {
      // If the object has a $oid field, convert it to ObjectId
      if (obj.$oid) {
        return new ObjectId(obj.$oid);
      }

      // Recursively transform arrays and nested objects
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          obj[key] = transform(obj[key]);
        }
      }
    }
    return obj;
  }

  // Apply the transformation to each document in the array
  return data.map((doc) => transform(doc));
}

// Reusable function to import data into a collection
async function importData(collectionName, jsonFilePath) {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB client
    await client.connect();
    console.log('Connected successfully to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Drop the collection before inserting new data
    await collection.drop();
    console.log(`Collection ${collectionName} dropped successfully`);

    // Read the JSON file asynchronously
    const data = await fs.readFile(jsonFilePath, 'utf8');
    const documents = JSON.parse(data);

    // Transform every $oid field into ObjectId
    const transformedDocuments = transformObjectIds(documents);

    // Insert the documents into the collection
    const result = await collection.insertMany(transformedDocuments);
    console.log(`${result.insertedCount} documents inserted successfully into ${collectionName}`);

  } catch (err) {
    console.error(`Error importing data into ${collectionName}:`, err);
  } finally {
    // Close the connection
    await client.close();
  }
}

// Main function to handle the import process
async function main() {
  try {
    // Define the collections and their corresponding JSON file paths
    const collections = [
      {
        name: 'categories', // Collection name
        jsonFilePath: 'mockdata/categories.json' // Path to the JSON file
      },
      {
        name: 'products', // Collection name
        jsonFilePath: 'mockdata/products.json' // Path to the JSON file
      }
    ];

    // Import data for each collection
    for (const collection of collections) {
      await importData(collection.name, collection.jsonFilePath);
    }

  } catch (err) {
    console.error('Error during import process:', err);
  }
}

// Export the main function
export default main;