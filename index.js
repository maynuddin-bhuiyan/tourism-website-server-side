const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');



const app = express();
const port = process.env.PORT || 9000;


//Middleware 

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l2npz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function run () {
    try{
        await client.connect();
        const database = client.db('All_Tourism');
        const touristCollection = database.collection('tourist');

        // Get Tourist Api 
        app.get('/tourist', async(req , res) => {
            const cursor = touristCollection.find({});
            const tourist = await cursor.toArray();
            res.send(tourist);

        })

        //Api Post
        app.post('/tourist', async(req, res) => {
            const tourist = req.body;
            console.log("Hit the post api", tourist);

            const result = await touristCollection.insertOne(tourist);
            console.log(result);

          

            res.json(result);


        })



    }
    finally{
        // await client.close();
    }

}


run().catch(console.dir)





app.get('/', (req, res) => {
    res.send('tourism-website-server-side-uxmain')
});


app.listen(port, () => {
    console.log("Server Running At Port", port);
})