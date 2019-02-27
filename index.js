let express = require('express');
let app = express();
let todoController = require('./controllers/todo_controller');
let authConroller = require('./controllers/auth_controller');
const PORT = process.env.PORT || 5000;
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/',function(req,res){
    res.render('home');
});

app.get(['/','/home'],function(req,res){
    res.render('home');
})


authConroller(app);
todoController(app);

app.listen(PORT);