//PREREQUISITES
var mongoose = require('mongoose')
var Schema = mongoose.Schema
    ,ObjectId = Schema.ObjectId;


//process.env.MONGOHQ_URL is for deploying on heroku
//node2blog can be changed to whatever you want your local database to be called i.e. 'my database'
var db_url = process.env.MONGODB_URI || "mongodb://localhost:27017/www"; 
var db = mongoose.connect(db_url);

//The MongoDB Schema for your posts

var cmdSch = new Schema({
    id: ObjectId,
    text: { type: String },
    date: { type: String },
    sauce:{ type: String }
});

var cmd = db.model('cmd', cmdSch);

