//PREREQUISITES
import  mongoose from 'mongoose';
const {Model, Schema} = mongoose;

var ObjectId = mongoose.Schema.ObjectId;
var db_url = process.env.MONGODB_URI || "mongodb://localhost:27017/www"; 
var db = mongoose.connect(db_url, {useNewUrlParser:true, useUnifiedTopology:true});

//The MongoDB Schema for your posts

const cmdSch = new Schema({
    id: ObjectId,
    text: { type: String },
    date: { type: String },
    sauce:{ type: String }
});
const blogSch = new Schema({
    id: ObjectId,
    text: {type:String},
    title:{type:String},
    date:{type:String},
    sauce:{ type: String }
});
class cmd extends Model{}
class blog extends Model{}

module.exports = mongoose.model(cmd, cmdSch, 'cmd')
module.exports = mongoose.model(blog, blogSch, 'blog');

