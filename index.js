const express = require('express');
const { createServer } = require('node:http'); // Socket.io needs an HTTP server. Since Express doesn't provide one directly, we use Node's 'http' module to wrap the Express app.
const { Server } = require('socket.io');
const app = express();
const server = createServer(app);
const io = new Server(server);


io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  socket.on('user message', (msg) => {
    // message ke saath timestamp aur sender id add kar rahe hain
    const data = {
      text: msg,
      id: socket.id,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    io.emit('message', data); 
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.use(express.static('public')); 

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});