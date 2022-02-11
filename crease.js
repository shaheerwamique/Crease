const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');  // ES6 Destruction assignment
const MongoClient = require('mongodb').MongoClient;

const app = express();
app.use(bodyParser.json());

require("dotenv")
  .config();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: true
}));

const crease = {};

//Mongo Component
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//Connect to database
try {
    mongoose.connect("mongodb://localhost:27017/node-demo", {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log("connected to db");
  } catch (error) {
    handleError(error);
  }
  process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error.message);
  });
var nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
});
var Names = mongoose.model("Names", nameSchema);

app.get('/crease', async (req, res) => {
    MongoClient.connect("mongodb://localhost:27017/node-demo", function(err, db) {
        if (err) throw err;
        var dbo = db.db("node-demo");
        dbo.collection("names").find({
        }) 
        .toArray(function (err, result) {
            if (err) {
              res.status(400).send("Error fetching listings!");
           } else {
              res.json(result);
            }
        });
    });
});

app.post('/crease', async (req, res) => {
    //const id = randomBytes(4).toString('hex');
    var myData = new Names(req.body);   
    myData.save()
    .then(item => {          
        res.send(item);
    })
    .catch(err => {
        res.status(400).send("Unable to save to database");
    });
});

app.listen(4000, () => {
    console.log('Listening on port 4000');
});



// Express (framework to design API)

// Mongoose (to manage MongoDB database)

// jsonwebtoken (for JWT tokens)

// dotenv (store and access environment variables)

// bcrypt (to encrypt the password)