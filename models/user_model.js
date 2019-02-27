var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin123@ds127995.mlab.com:27995/todos', { useNewUrlParser: true });

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    token: String
});


var user = mongoose.model('users', userSchema);
var userdata = require('../userdata');


module.exports.SaveUser = function(resp, newdata)
{

    user.findOne({username: newdata.username}, function(err, data){
        if(err)
            throw err;

        if(data == null)
            SaverUserDB(resp, newdata);
        
        else
            resp.render("register",{message: "username already exists"});

    });
}

SaverUserDB = function(resp, newdata)
{

    bcrypt.hash(newdata.password, 10, function(err,hash){
        
        newdata.password = hash;
        newItem = user(newdata).save(function(err, data){
            if(err)
                throw err;
            
            userdata.username = newdata.username;
            userdata.userpassword = newdata.password;
            userdata.userid = data._id;
            resp.redirect('/todo');
        });
    })
}

module.exports.LoginUser = function(resp, udata)
{
    user.findOne({username: udata.username}, function(err, data){
        if(err)
            throw err;

        if(data == {})
            resp.render("login",{message: "Invalid username"});
        
        bcrypt.compare(udata.password, data.password, function(err, state){
            if(!state)
                resp.render("login",{message: "Invalid password"});
            else
            {
                userdata.username = data.username;
                userdata.userpassword = data.password;
                userdata.userid = data._id;
                resp.redirect("/todo");
            }
        });
    });

}
