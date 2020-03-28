var express = require('express');
var router = express.Router();

var usuarios = require('../models/usuarios');

var bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/registrar', function(req, res, next) {
  res.render('registro',{alert: 0});
});

router.post('/registrar', function(req,res){
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
        res.render('registro',{alert:1,tError: error.message});
      }else{
        res.render('registro',{alert:2});
      }
    });
  });
});

router.get('/login', function(req,res){
  res.render('login',{alert: 0});
});

router.post('/login', function(req,res){
  var data = req.body;
  usuarios.findOne({email: data.user}, function(err, user){
    bcrypt.compare(data.password, user.password, function(err, result) {
      if(result){
        res.redirect('/zombies');
      } else {
        res.render('login',{alert:1,tError: err});
      }
  });
  });
});

module.exports = router;
