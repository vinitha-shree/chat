var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var rug = require('random-username-generator');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  var new_username = rug.generate();
  console.log(new_username);
  socket.on('chat message', function(msg){
    io.emit('chat message', {id:new_username , mes:msg});
  });
  console.log("new connection made");
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});