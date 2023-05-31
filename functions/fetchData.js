const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_CONNECTION_STRING;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

exports.handler = async (event, context) => {
  try {
    await client.connect();
    const db = client.db('nad_data');
    const collection = db.collection('NAD_practice');
    const data = await collection.find().toArray();
    await client.close();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred while fetching data' }),
    };
  }
};
