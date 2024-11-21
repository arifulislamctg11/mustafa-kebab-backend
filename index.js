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


// const uri = `mongodb+srv://mustofaKebab:nttgpDKueCAFA747@cluster0.0afhd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const uri='mongodb+srv://Mustafa:tnS42aC0hF6GK5hG@cluster0.uqcmivv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
  try {

    const menuCollection = client.db('Mustafa').collection('menu'); //mustofa
    const orderCollection = client.db('Mustafa').collection('order');



          //  Get all ordersMenu data 
          app.get ('/getAllOrdersMenu', async(req,res)=>{
            const orderMenu=await orderCollection.find().toArray()
            res.send(orderMenu)
          })
          // Get all menu data form db 
          app.get('/menu', async (req, res) => {
            const result = await menuCollection.find().toArray();
            res.send(result);
        })

        //  ordersMenu 
        app.post('/ordersMenu',async(req,res)=>{
          try {
            const order = req.body;
            const orderMenu = await orderCollection.insertOne(order);
            res.send(orderMenu);
          } catch (error) {
            console.error('Error while saving order:', error);
            res.status(500).send('Failed to save order');
          }

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