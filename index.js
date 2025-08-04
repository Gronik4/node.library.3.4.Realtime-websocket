const express = require('express');

const notPage = require('./Middleware/notPage');

const router = require('./Routes/index');
const bookRouters = require('./Routes/books');

const app = express();
app.use(express.urlencoded());
app.set('view engine', 'ejs');

app.use('/', router);
app.use('/book', bookRouters);

app.use(notPage);

const PORT = process.env.PORT || 3006;
app.listen(PORT, (err)=> {
  if(err) {
    return console.log(`Server not starting - err: ${err}`);
  } else {
    console.log(`Server starting on port: ${PORT}`);
  }
})
