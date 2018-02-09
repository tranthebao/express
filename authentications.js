var express = require('express');
var app = express();
var bodyparser =  require('body-parser');
var multer = require('multer');
var upload = multer();
var session = require('express-session');
var cookieparser =  require('cookie-parser');
var path = require('path');
app.engine('pug', require('pug').__express)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.static('images'));

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(upload.array());
app.use(cookieparser());
app.use(session({secret: 'your secret key'}));

var Users = [];

app.get('/signup', function(req, res){
    res.render('signup');
});
app.post('/signup', function(req, res){
    if(!req.body.id || !req.body.password){
        res.status("400");
        res.send("Invalid details.");
    }else{
        Users.filter(function(user){
            if(user.id == req.body.id){
                res.render('signup',{
                    message: 'User Already Exits! Login or choose another user id'
                });
            }
        });
        var newUser = {id: req.body.id, password: req.body.password};
        Users.push(newUser);
        req.session.user =  newUser;
        res.redirect('./protected_page');
    }
});

app.listen(8000);