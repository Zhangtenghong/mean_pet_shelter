var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var flash = require('express-flash');
var path = require('path');
var uniqueValidator  = require('mongoose-unique-validator'); //no name duplication
 
app.use(flash());
app.use(bodyParser.json());
app.use(express.static( __dirname + '/public/dist/public' ));
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

mongoose.connect('mongodb://localhost/pets');
var PetSchema = new mongoose.Schema({
  name:  { type: String, required:[true,"Name cannot be blank"], minlength:[3, "Name must be at least 3 characters"], unique: true},
  type: { type: String, required:[true,"Type cannot be blank"], minlength:[3, "Type must be at least 3 characters"]},
  description: { type: String, required:[true,"Description cannot be blank"], minlength:[3, "Description must be at least 3 characters"]},
  skill_1: {type: String, required: false},
  skill_2: {type: String, required: false},
  skill_3: {type: String, required: false},
  likes: {type:Number}
 } , {timestamps:true});

PetSchema.plugin(uniqueValidator , {message: '{PATH} All of our pets here have unique names! Please Try a new Name.'});
mongoose.model('Pet', PetSchema);
var Pet = mongoose.model('Pet'); 

var mysort = {type:1}
app.get('/api/pets', function(req, res) {
  Pet.find({}, function(err, pets){
    if(err){
      console.log("Returned error", err);
      return res.json({message:"Error", error:err})
    } else {
      return res.json(pets)
    }
  }).sort(mysort)
})

app.get('/api/pets/:id', function(req, res) {
  Pet.findOne({_id:req.params.id}, function(err, pet){
    if(err){
      console.log("Returned error", err);
      return res.json({message:"Error", error:err})
    } else {
      console.log("the pet is", pet)
      return res.json(pet)
    }
  })
})

app.post('/api/pets', function(req, res) {
  console.log("POST DATA", req.body);
  var pet = new Pet(
    {name: req.body.name, 
    type: req.body.type,
    description: req.body.description, 
    skill_1:req.body.skill_1, 
    skill_2:req.body.skill_2, 
    skill_3:req.body.skill_3,
    likes:0
  });
  pet.save(function(err,data) {
    if(err) {
      console.log("RANDOMLY IN ERORO SECTOIN YAY")
      let errors=[];
      for(var key in err.errors){
        errors.push(err.errors[key].message)
      }
      return res.status(400).json(errors)
    } else { 
      return res.json(data)
    }
  })
})

app.put('/api/pets/:id', function(req, res){
  console.log(req.body);
  Pet.findOneAndUpdate({_id:req.params.id}, {name: req.body.name, 
    type: req.body.type,
    description: req.body.description, 
    skill_1:req.body.skill_1, 
    skill_2:req.body.skill_2, 
    skill_3:req.body.skill_3,
  }, {runValidators:true, context:'query'}, (err,data)=>{
    console.log(req.body)
    if(err){
      console.log("Returned error", err);
      let errors=[];
      for(var key in err.errors){
        errors.push(err.errors[key].message)
      }
      return res.status(400).json(errors)
    } else {
      return res.json(data)
    }
  })
})

app.put('/api/pets/:id/like', function(req, res){
  console.log("POST DATA", req.body);
  let pet=req.body;
  Pet.findOneAndUpdate({_id:req.params.id}, pet, function(err,data){
    if(err){
      return res.json({message:"Error", error:err})
    } else {
      return res.json({message:"Success",data})
    }
  })
})

app.delete('/api/pets/:id', function(req, res){
  console.log("POST DATA", req.body);
  Pet.remove({_id:req.params.id}, function(err){
    if(err){
      console.log("Returned error", err);
      return res.json({message:"Error", error:err})
    } else {
      return res.json({message:"Success"})
    }
  })
})

app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./public/dist/public/index.html"))
});

app.listen(8000, function() {
    console.log("listening on port 8000");
})