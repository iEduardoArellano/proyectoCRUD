var express = require('express');
var router = express.Router();

var zombie = require('../models/zombie');
var cerebro = require('../models/cerebro');
var usuarios = require('../models/usuarios');

var bcrypt = require('bcrypt');
const saltRounds = 10;

var loggeado = false;

router.get('/zombies',(req, res)=>{
    zombie.find().exec((error, zombies)=>{
        if(!error){
            res.status(200).json(zombies);
        } else {
            res.status(500).json(error.message);
        }
    });
});

router.post('/zombies/new', (req, res) => {
    var data = req.body;
    var nuevoZombie = new zombie({
        name: data.name,
        email: data.email,
        type: data.type
    });
    nuevoZombie.save(function(error){
      if(error){
        res.status(500).json({errors: error.message});
      }else{
        res.status(200).json({});
      }
      });
    
  });

router.post('/zombies/delete/:id',async (req,res) => {
  try{
    var dzombie = await zombie.findByIdAndRemove(req.params.id);
    res.status(200).json(dzombie);
  }catch(e){
    res.status(500).json(error);
  }
});

router.put('/zombies/edit/:id', async (req,res) => {
  var editZombie = await zombie.findById(req.params.id);
  var data = req.body;
  editZombie.name = data.name;
  editZombie.email = data.email;
  editZombie.type = data.type;
  await editZombie.save(function(error){
    if(error){
      res.status(500).json({errors: error.message});
    }else{
      res.status(200).json({});
    }
  });
});

//cerebros

router.get('/cerebro',(req, res)=>{
    cerebro.find().exec((error, cerebro)=>{
        if(!error){
            res.status(200).json(cerebro);
        } else {
            res.status(500).json(error);
        }
    });
});

router.post('/cerebro/add', async (req, res) => {
  var data = req.body;
  var nuevoCerebro = new cerebro({
      flavor: data.flavor,
      description: data.description,
      iq: data.iq,
      picture: data.picture
  });
  await nuevoCerebro.save(function(error){
    if(error){
      res.status(500).json({errors: error.message});
    }else{
      res.status(200).json({});
    }
  });
});

router.post('/cerebro/delete/:id',async (req,res) => {
  try{
    var dcerebro = await cerebro.findByIdAndRemove(req.params.id);
    res.status(200).json(dcerebro);
  }catch(e){
    res.status(500).json({error:e.message});
  }
});

router.put('/cerebro/edit/:id',async (req,res) =>{
  try {
    var data = req.body;
    var editcerebro = await cerebro.findById(req.params.id);
      editcerebro.flavor = data.flavor;
      editcerebro.description = data.description;
      editcerebro.iq = data.iq;
      editcerebro.picture = data.picture;
      await editcerebro.save(function(error){
      if(error){
        res.status(500).json({errors: error.message});
      }else{
        res.status(200).json({valor: "okay"});
      }
    });
  } catch (error) {
    res.status(500).json({errors: error.message});
  }
});

//usuarios

router.post('/usuario/registrar', function(req,res){
  var data = req.body;
  bcrypt.hash(data.password, saltRounds, function (err,   hash) {
    var nuevoUsuario = new usuarios({
    name: data.name,
    email: data.email,
    password: hash,
    picture: data.picture,
    role: data.role
    });
    console.log(nuevoUsuario);
    
    nuevoUsuario.save(function(error){
      if(error){
        res.status(500).json(error.message);
      }else{
        res.status(200).json({});
      }
    });
  });
});

router.post('/usuario/login', function(req,res){
  var data = req.body;
  usuarios.findOne({email: data.email}, function(error, user){
    if(user == null){
      res.status(500).json({errors: "usuario no encontrado"});
    }else {
      bcrypt.compare(data.password, user.password, function(error, result) {
        if(result){
          loggeado = true;
          res.status(200).json({});
        } else {
          res.status(500).json({errors: "contraseña erronea"});
        }
      });
    }
  });
});

router.get('/loggeado', function(req,res){
  if(loggeado){
    res.status(200).json(loggeado);
  }else{
    res.status(500).json(loggeado);
  }
});

module.exports = router;