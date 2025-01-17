require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 5000;
const app = express();
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion } = require('mongodb');


// middlewares


const uri = "mongodb+srv://user-infinity:saQLWNYrOCJGBGPY@cluster0.vkwnn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const jobCollectoin = client.db('JobList').collection('jobsForjwt')
    app.get('/services', async(req, res) => {
        const cursor = jobCollectoin.find();
        const result = await cursor.toArray();
        res.send(result)
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.use(express.json());
app.use(cors({origin: ['http://localhost:5173',], credentials: true}));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Jwt final practice is going on Database is running')
})

app.listen(port, () => {
    console.log(`This databse is going on : ${port}`)
})