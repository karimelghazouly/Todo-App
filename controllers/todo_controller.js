var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var userdata = require('../userdata');

var urlparser = bodyParser.urlencoded({extended : false});
mongoose.connect('mongodb://admin:admin123@ds127995.mlab.com:27995/todos', { useNewUrlParser: true });

var todoSchema = new mongoose.Schema({
    userid: String,
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = function(app)
{
    app.get('/todo',function(req,resp){
        
        Todo.find({userid:userdata.userid}, function(err, data){
            if(err)
                throw err;
            resp.render('todo', {todos:data});
        });
        
    });

    app.post('/todo', urlparser, function(req,resp){
        ndata = req.body;
        ndata.userid = userdata.userid;
        
        newItem = Todo(ndata).save(function(err, data){
            if(err)
                throw err;
            
            resp.json(data);
        });
        
    });

    app.delete('/todo/:item', function(req,resp){
        
        name = req.params.item.substr(1);
        id = userdata.userid;
        Todo.find({userid: id, item: name }).deleteOne(function(err, data){
            if(err)
                throw err;

            
            resp.json(data);
        })
        
    });
};