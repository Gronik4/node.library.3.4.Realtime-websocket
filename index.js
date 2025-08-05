const express = require('express');
const path = require('path');

const notPage = require('./Middleware/notPage');

const router = require('./Routes/index');
const bookRouters = require('./Routes/books');
const http = require('http');
const socketIO = require('socket.io');


const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.use(express.urlencoded());
app.set('view engine', 'ejs');

app.use('/', router);
app.use('/book', bookRouters);

app.use(notPage);

io.on('connection', (socket)=> {
  const { id } = socket;
  console.log(`Sockey connectsd ${id}`);

  //сообщение себе
  socket.on('message-to-me', (msg)=> {
    msg.type = 'me';
    socket.emit('message-to-me', msg);
  })
  //сообщение для всех 
  socket.on('message-to-all', (msg)=> {
    msg.type = 'all';
    socket.broadcast.emit('message-to-all', msg);
    socket.emit('message-to-all', msg);
  })

  socket.on('disconnect', ()=> {
    console.log(`Socket disconnect ${id}`);
  })
})

const PORT = process.env.PORT || 3006;
/*app.listen(PORT, (err)=> {
  if(err) {
    return console.log(`Server not starting - err: ${err}`);
  } else {
    console.log(`Server starting on port: ${PORT}`);
  }
})*/
server.listen(PORT, (err)=> {
  if(err) {
    return console.log(`Server not starting - err: ${err}`);
  } else {
    console.log(`Server starting on port: ${PORT}`);
  }
})
