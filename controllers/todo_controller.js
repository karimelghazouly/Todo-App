var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var urlparser = bodyParser.urlencoded({extended : false});
mongoose.connect('mongodb://admin:admin123@ds127995.mlab.com:27995/todos', { useNewUrlParser: true });

var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = function(app)
{
    app.get('/todo',function(req,resp){
        
        Todo.find({}, function(err, data){
            if(err)
                throw err;
            resp.render('todo', {todos:data});
        });
        
    });

    app.post('/todo', urlparser, function(req,resp){
        newItem = Todo(req.body).save(function(err, data){
            if(err)
                throw err;
            
            resp.json(data);
        });
        
    });

    app.delete('/todo/:item', function(req,resp){
        console.log(req.params.item.replace(/\-/g," "));
        Todo.find({item: req.params.item.replace(/\-/g,"")}).deleteOne(function(err, data){
            if(err)
                throw err;
            console.log(data);
            resp.json(data);
        })
        
    });
};