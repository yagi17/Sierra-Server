require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require('mongodb');

// middleware
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://sierra-c9379.web.app"
        ]
    })
);
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5bvaa0x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});



const dbConnect = async () => {
    try {
        console.log("You successfully connected to MongoDB!");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error.massage);
    }
};
dbConnect();

const CarsCollections = client.db('sierra').collection('car')

// get cars informations
app.get('/cars', async (req, res) => {
    const result = await CarsCollections.find().toArray()
    res.send(result)
})

app.get('/', (req, res) => {
    res.send('Drifting siuuuuuuuuuuuu')
})
app.listen(port, () => {
    console.log(`Cars drifting at port: ${port}`);
})