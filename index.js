const express = require('express');
const routes = require('./routes/api');

var cors = require('cors');

const app = express();

app.use(cors());

const uri = "mongodb+srv://rashmika:Rashmika@fashionstore-k14re.mongodb.net/test?retryWrites=true&w=majority";

app.use(express.json());  //  useNewUrlParser: true, useFindAndModify: false

app.use(express.urlencoded({extended:true}));

app.use('/',routes);


app.listen(4003,function(){

    console.log('now listening for requests');
});





