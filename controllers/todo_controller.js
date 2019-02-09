var data = [
    {item: 'hamad el ahmar'},
    {item: 'erorororor'},
    {item: 'asasdawqeqwe'}
]

var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var urlparser = bodyParser.urlencoded({extended : false});
mongoose.connect('mongodb://admin:admin123@ds127995.mlab.com:27995/todos');

var todoSchema = new mongoose.Schema({
    itme: String
})


module.exports = function(app)
{
    app.get('/todo',function(req,resp){
        resp.render('todo', {todos:data});
    });

    app.post('/todo', urlparser, function(req,resp){
        data.push(req.body);
        resp.json({data});
    });

    app.delete('/todo/:item', function(req,resp){
        data = data.filter(function(todo){
            return todo.item.replace(/ /g, '-') !== req.params.item;
        });
        resp.json(data);
    });
};