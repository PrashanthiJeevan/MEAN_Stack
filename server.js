var express = require('express');
    app = express();
    cors = require('cors'),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
app.use(express.static('dist'));
var db='';
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));

// parse application/json
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}));
app.get('/',function(req,res){
res.send(__dirname+'/index.html');
});
app.post('/starttoken/:id',function(req,res){
    var temp=req.body;
   if(temp.name!=""){
        var token=jwt.sign({
            email:req.body.name
        },'marlabs-secret-key'
        );
        res.send({token:token,text:"Token Created"});
    }
    
   
});
app.use(function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers.token;
    if (token) {
        jwt.verify(token, 'marlabs-secret-key', function (err, decoded) {
            if (!err) {
                req.decoded = decoded;
                next();
            } else {
                res.send({
                    msg: 'Invalid request token',
                    isLoggedIn: false
                });
            }
        });
    } else {
        res.send({
            msg: 'no token',
            isLoggedIn: false
        });
    }
});
app.post('/postlist',function(req,res){
  var test=req.body;
res.send({msg:"login Success",isLoggedIn:true});
});
app.get('/getposts',function(req,res){
db.collection('exam3').find().toArray(function(err,doc){
    res.end(JSON.stringify(doc));
});
});
app.post('/submitpost',function(req,res){
    var test=req.body;
    console.log(test);
    if(test!=''){
        db.collection('exam3').insert(test);
        var test2={
            username:test.username,
            post:test.post,
            liked:false
        }
        db.collection('likes').insert(test2);
        console.log(test2);
        res.send({msg:"tableupdated",value:true});
    }

  });
  app.post('/removepost',function(req,res){
    var test=req.body;
    if(test!=''){
        db.collection('exam3').remove(test);
        res.send({msg:"tableupdated",value:true});
    }

  });
  app.post('/likes/:id',function(req,res){
    console.log(req.params.id);
    if(req.params.id=='add'){
    var test={
    username:req.body.username,
    post:req.body.post
    };
    var test2={
        username:req.body.username,
        post:req.body.post,
        liked:!req.body.liked
    }
    db.collection('likes').find(test).toArray(function(err,doc){
        var temp3=JSON.stringify(doc);
        console.log(JSON.stringify(doc).length);
        if(temp3.length<3){
            db.collection('likes').insert(req.body);
            res.send({msg:"table inserted",value:true});
        
          
        }
        else{
            console.log(JSON.stringify(doc));
            db.collection('likes').update(test2,req.body);
            res.send({msg:"likes updated",value:true});
        }
    });
}
else{
    var temp={
        username:req.decoded.email
    }
    console.log(req.decoded.email);
    db.collection('likes').find().toArray(function(err,doc){
    res.end(JSON.stringify(doc));
    });
}
      

  });
  app.post('/savecomment/:id',function(req,res){
var cmt=req.params.id;
if(cmt=='add'){
    db.collection('exam_cmt').insert(req.body);
    res.send({msg:"data entered",value:true});
}
if(cmt=='show'){
    db.collection('exam_cmt').find(req.body).toArray(function(err,doc){
        res.end(JSON.stringify(doc));
    });
}
if(cmt=='delete'){
    db.collection('exam_cmt').remove(req.body);
    res.send({msg:"data entered",value:true});
}
  });
MongoClient.connect(url,function(err,client){
if(!err){
    app.listen(3000,function(){
        console.log("Sucessfully started");
        db=client.db('vivek');
        });
}
});
