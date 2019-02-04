let express = require('express');
let app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));


app.listen(3000);
console.log("http://127.0.0.1:3000");