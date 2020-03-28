var express = require('express');
var router = express.Router();
var zombie = require('../models/zombie');

/* GET home page. */
router.get('/', function(req, res, next) {
  zombie.find().exec(function(error,zombies){
    if(!error){
      res.render('index', { title: 'Express',coleccion: zombies });
    }
  });
});

router.get('/add',function(req,res){
  res.render('add',{alert:0});
});

/* GET home page. */
router.post('/new', function(req, res) {
  var data = req.body;
  var nuevoZombie = new zombie({
      name: data.name,
      email: data.email,
      type: data.type
  });
  nuevoZombie.save(function(error){
    if(error){
      res.render('add',{alert:1,tError: error.message});
    }else{
      res.render('add',{alert:2});
    }
    });
  
});

router.get('/edit/:id',async function(req,res){
  var editZombie = await zombie.findById(req.params.id);
  res.render('edit',{eZombie:editZombie});
});

router.post('/edit/:id',async function(req,res){
  var editZombie = await zombie.findById(req.params.id);
  var data = req.body;
  editZombie.name = data.name;
  editZombie.email = data.email;
  editZombie.type = data.type;
  await editZombie.save(function(error){
    if(error){
      res.render('edit',{eZombie:editZombie,alert:1,tError:error});
    }else{
      res.render('edit',{eZombie:editZombie,alert:2});
    }
  });
});

router.get('/delete/:id', async function(req,res){
  var ezombie = await zombie.findById(req.params.id);
  res.render('delete',{eZombie:ezombie, alert:0});
});

router.post('/delete/:id',async function(req,res){
  try{
    var dzombie =await zombie.findByIdAndRemove(req.params.id);
    res.redirect('/zombies');
  }catch(e){
    res.render('delete',{eZombie:dzombie, alert:1});
  }
});

module.exports = router;
