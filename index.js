const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')

const port = process.env.PORT || 8000

// middleware
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

app.use(express.json())


const uri = `mongodb+srv://mustofaKebab:nttgpDKueCAFA747@cluster0.0afhd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
  try {

    const menuCollection = client.db('mustofa').collection('menu');

          // Get all menu data form db 
          app.get('/menu', async (req, res) => {
            const result = await menuCollection.find().toArray();
            console.log(result)
            res.send(result);
        })
















    // Send a ping to confirm a successful connection
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    )
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('Hello from mustofa Server..')
})

app.listen(port, () => {
  console.log(`mustofa is running on port ${port}`)
})