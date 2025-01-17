# Step-1
To start a project you have to create folder
```
mkdir my-project
```
Then go into your folder
```
cd my-project
```
# Step-2

```
npm init -y
```
# Step-3
install pacakges
```
npm install dotenv express jsonwebtoken cors mongodb cookie-parser
```

# Initially your code will look like this:
```
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 5000;
const app = express();
const jwt = require('jsonwebtoken');


// middlewares

app.use(express.json());
app.use(cors({origin: ['http://localhost:5173',], credentials: true}));
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('Jwt final practice is going on Database is running')
})

app.listen(port, () => {
    console.log(`This databse is going on : ${port}`)
})
```

# Step-4
Bellow your middleware put mongodb connection string.
here is sample
```

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://<db_username>:<db_password>@cluster0.vkwnn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

```

# Step-5
Then put your username and passwordin uri

* Step-6 
create a database collection and start crud operation
```
    const jobCollectoin = client.db('JobList').collection('jobsForjwt')
```
don't forget to comment await client.close otherwise you will not able to get data from database or face error
```
    // await client.close();
```