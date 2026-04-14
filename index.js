const express = require('express')
const app = express()
const port = process.env.PORT || 3000


app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello CRUD Server!')
})

app.listen(port, () => {
  console.log(`CRUD Server app listening on port ${port}`)
})
