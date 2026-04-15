const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express()
const port = process.env.PORT || 7000


app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://module50:3yPuKLG2jU5Gqnqm@cluster0.zh14pzm.mongodb.net/?appName=Cluster0"

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
app.get('/', (req, res) => {
  res.send('Hello CRUD Server!')
})




async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const usersDB = client.db("usersDB");
    const usersCollection = usersDB.collection("users");

    
    app.get("/users", async (req, res) => {
      const cursor = usersCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post('/users', async (req, res) => {
      const newUser = req.body;
   

      const result= await usersCollection.insertOne(newUser);
      res.status(201).json(result);
      
    });


    app.delete("/user/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await usersCollection.deleteOne(query);
        res.send(result);
        });


     // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`CRUD Server app listening on port ${port}`)
})
