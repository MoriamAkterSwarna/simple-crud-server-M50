const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000


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




app.listen(port, () => {
  console.log(`CRUD Server app listening on port ${port}`)
})
