

var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var session = require('express-session');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({secret:'SuperSecretPassword'}));
app.use(express.static('public'));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 4500);

app.post('/',function(req,res,body){
    var request = new XMLHttpRequest();
    var context = {};
    var data = [];
    for(var a in req.body){
        data.push({'key':a,'value':req.body[a]})
    };
    request.open('POST',"http://web.engr.oregonstate.edu/~zhangluy/tools/class-content/form_tests/check_request.php",True);
    request.setRequestHeader("Content-Type","application/json");
    req.addEventListener('load',function(){
        if (request.status >= 200 && request.status < 400) {
            context.owm = body;
            console.log(body);
            context.name = req.body.name;
            res.render('home', context);
        }
    });
    request.send(JSON.stringify(data));
    body.preventDefault();
});

app.get('/work-education',function(req,res){
    var context = {};
    context.sentData = req.query.myData;
    res.render('work-education', context);
});

app.get('/personal',function(req,res){
    res.render('personal', context);
});

app.get('/photos',function(req,res){
    var qParams = [];
    res.render('photos', context);
});

app.use(function(req,res){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});


app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});