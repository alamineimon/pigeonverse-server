const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');

//mmiddle wares
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.juguzvf.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try{
      const userCollection = client.db("Pigeon_Verse").collection("users");
      const postCollection = client.db("Pigeon_Verse").collection("posts");


    // post user when they are created
    app.post("/users", async (req, res) => {
        const user = req.body;
        const result = await userCollection.insertOne(user);
        res.send(result);
      });


// a single post sent to the database
    app.post("/posts", async (req, res) => {
        const post = req.body;
        const result = await postCollection.insertOne(post);
        res.send(result);
    });
    
    //Get all post from mongodb
    app.get("/posts", async (req, res) => {
      const query = {};
      const posts = await postCollection.find(query).toArray();
      res.send(posts);
    });

    // single post details  
    app.get('/posts/:id', async(req, res)=>{
        const id =req.params.id;
        const query = {_id: ObjectId(id)};
        const result = await postCollection.findOne(query);
        res.send(result);
    });

  
    }
    finally{
  
    }
  }run().catch((err) => console.error(err));
  




















app.get("/", ( req, res) => {
  res.send("Pigeon Verse server is running");
});

app.listen(port, () => {
  console.log(`Pigeon Verse Server running on port: ${port}`);
});
