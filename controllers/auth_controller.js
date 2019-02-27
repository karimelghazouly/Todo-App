// user data

var bodyParser = require('body-parser');
var urlparser = bodyParser.urlencoded({extended : false});
var usermodel = require('../models/user_model');

module.exports = function(app)
{
    app.get('/register', urlparser, function(req, resp){
        resp.render('register');
    });

    app.get('/login', urlparser, function(req, resp){
        resp.render('login');
    });

    app.post('/login', urlparser, function(req, resp){
        data = req.body;
        usermodel.LoginUser(resp, data);
    });

    app.post('/register', urlparser, function(req, resp){
        data = req.body;
        usermodel.SaveUser(resp, data);
    });
}