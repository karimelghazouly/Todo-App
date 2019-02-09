let express = require('express');
let app = express();
let todoController = require('./controllers/todo_controller');


app.set('view engine', 'ejs');
app.use(express.static('public'));

todoController(app);

app.listen(3000);
console.log("http://127.0.0.1:3000");