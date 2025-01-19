require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 5000;
const app = express();
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion } = require('mongodb');


// middlewares
app.use(express.json());
app.use(cors({origin: ['http://localhost:5173',], credentials: true}));
app.use(cookieParser());

const verifyToken = (req, res, next) => {
  const token = req?.cookies?.token; //check if token exists in cookies

  if(!token) {
    return res.status(401).send({message: 'Unauthorized access - No Token'});
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if(err) {
      const errorMessage = err.name === 'TokenExpiredError' 
      ?
      'Token expired'
      :
      'Invalid token';
      return res.status(401).send({message: errorMessage}) ;
    }
    req.user = decode; // save decode payload to `req.user`
    next();
  })
}


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
    // jwt
    app.post('/jwt', async(req, res) => {
      const user = req.body;
      const token = jwt.sign({email: user.email}, process.env.JWT_SECRET, {expiresIn: '1h'});
      res.cookie('token', token, {
        httpOnly: true,
        secure: false,
      })
      .send({success: true});
    });

    // jwt logout funciton
    app.post('/logout', (req, res) => {
      res
      .clearCookie('token', {
        httpOnly: true,
        secure: false,
        path: '/',
      })
      .send({ success: true })
    })


    app.get('/services', verifyToken, async(req, res) => {
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



app.get('/', (req, res) => {
    res.send('Jwt final practice is going on Database is running')
})

app.listen(port, () => {
    console.log(`This databse is going on : ${port}`)
})