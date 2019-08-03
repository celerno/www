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
var blogSch = new Schema({
    id: ObjectId,
    text: {type:String},
    title:{type:String},
    date:{type:String},
    sauce:{ type: String }
});
var diarioSch = new Schema({
    id: ObjectId,
    name: {type:String},
    password:{type:String},
    tareas:[{
        id:ObjectId,
        name: {type:String}, // "aprender algo" / hacer ejercicio por la mañana / hacer desayuno / lavarme los dientes / cargar las tareas del día /
        tipo:{type:String}, //alimentación, salud, ocio, sexo, ejercicio, proyectos, trabajo, dinero
        frecuencia:{type:String}, //L,M,M,J,V,S,D (todos, sería diario, uno o más, sería sólo esos días cada semana,)
                                  //(M,2,16) (M,L)           (sería mensual, los días 2 y 16 o Mensual, el primer lunes)
        momento: {type: String}, //mañana, tarde, noche
    }],
    dias: [{
        dia: {type:date},
        tarea:{type:ObjectId, ref:'Tarea'},
        status: {type:Boolean}, //Hecho, no hecho
        comentarios: {type:String}, // obligatorio cuando status sea 0, se leerá en html, talvez markup.
        }]
});

var cmd = db.model('cmd', cmdSch);
var blog = db.model('blog', blogSch);
var diario = db.model('diario', diarioSch);

