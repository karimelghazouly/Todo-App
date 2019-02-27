var bodyParser = require('body-parser');
var userdata = require('../userdata');
var todomodel = require('../models/todo_model');
var urlparser = bodyParser.urlencoded({extended : false});


module.exports = function(app)
{
    app.get('/todo',function(req,resp){
        todomodel.FindTodo(resp);
    });

    app.post('/todo', urlparser, function(req,resp){
        ndata = req.body;
        ndata.userid = userdata.userid;
        
        todomodel.SaveTodo(resp, ndata);
    });

    app.delete('/todo/:item', function(req,resp){
        
        name = req.params.item.substr(1);
        name = name.replace(/-/g, " ");
        id = userdata.userid;
        data = {userid: id, item: name };
            
        todomodel.DeleteTodo(resp, data);       
    });
};