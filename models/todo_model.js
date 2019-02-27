var mongoose = require('mongoose');
var userdata = require('../userdata');
mongoose.connect('mongodb://admin:admin123@ds127995.mlab.com:27995/todos', { useNewUrlParser: true });

var todoSchema = new mongoose.Schema({
    userid: String,
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports.SaveTodo = function(resp, ndata)
{
    newItem = Todo(ndata).save(function(err, data){
        if(err)
            throw err;
        
        resp.json(data);
    });
}


module.exports.DeleteTodo = function(resp, udata)
{
    Todo.find(udata).deleteOne(function(err, data){
        if(err)
            throw err;
        
        resp.json(data);
    });

}

module.exports.FindTodo = function(resp)
{
    Todo.find({userid:userdata.userid}, function(err, data){
        if(err)
            throw err;
        resp.render('todo', {todos:data});
    });
}
