var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
        
app.get('/', function(req, res) {
    res.sendfile('index.html');
});

io.on('connection', function(socket) {
    var id = socket.id;
    console.log("handshake : "+socket.hasOwnProperty("handshake"));
    console.log("headers : "+socket.handshake.hasOwnProperty("headers"));
    console.log('a user connected, socket id : '+id, socket);

    setTimeout(function () {
        socket.disconnect(true);     
    }, 30000);

    socket.on("disconnect", function() {
        console.log("a user disconnected, socket id : "+id); 
    });
});

http.listen(port, function() {
    console.log('listening on *:'+port);
});
