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