var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(4040);
// WARNING: app.listen(80) will NOT work here!

io.on('connection', (socket) => {
  /* … */
  console.log('someone connected');

  socket.on('message', (msg) => {
    console.log(msg);
  });

  socket.on('alertCreated', function(){
    console.log('CRIADO');
  });
});

module.exports = {socket: io};
