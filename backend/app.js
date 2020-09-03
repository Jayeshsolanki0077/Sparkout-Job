const express = require ('express'); 

const mongoose = require ('mongoose'); 

const bodyParser = require('body-parser');  

const cors = require('cors');      

require('dotenv/config');  

const registrationRoutes = require ('./routes/users.js');    
const notesRoutes = require('./routes/Notes.js');

const app = new express(); 

app.use(cors());    

app.use(bodyParser.json()); 

app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', registrationRoutes);  
app.use('/notes', notesRoutes);

//connect to db
mongoose.connect( process.env.DB_CONNECTION, 
                    { useNewUrlParser: true , useUnifiedTopology: true },
                    () => console.log("connected to DB"))   

app.listen(4000, () => console.log('server is running on 4000'));    