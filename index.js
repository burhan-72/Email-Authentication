const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');

const cors = require('cors');

require('dotenv').config();



app.use(express.urlencoded());

app.use(express.json());
app.use(cors());


app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', require('./routes'));



app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});