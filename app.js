var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
        
app.get('/', function(req, res) {
    res.sendfile('index.html');
});

io.on('connection', function(socket) {
    var id = socket.id;
    var ua = undefined;

    if (socket.hasOwnProperty("handshake") && 
        socket.handshake.hasOwnProperty("headers") && 
        socket.handshake.headers.hasOwnProperty("user-agent")) {
            ua = socket.handshake.headers["user-agent"];
    }

    console.log('a user connected, socket id : '+id+", ua : "+ua);

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
