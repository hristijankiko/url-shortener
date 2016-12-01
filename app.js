let express = require('express');
let app = express();
require('./db');

app.use(express.static(__dirname + '/public'));
app.set('views', './views');
app.set('view engine', 'pug');

require('./routes')(app);

app.listen(process.env.PORT || 3000, function(){
  console.log("Listening at port 3000");
});