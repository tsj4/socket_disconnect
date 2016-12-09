var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
        
app.get('/', function(req, res) {
    res.sendfile('index.html');
});

io.on('connection', function(socket) {
    console.log('a user connected, socket id : 'socket.id);

    socket.on("foo", function (data) {
        console.log("message : ", data);
    });

    setTimeout(function () {
        socket.disconnect(true);     
    }, 30000);

    socket.on("disconnect", function(socket) {
        console.log("a user disconnected, socket id : "+socket.id); 
    });

    
});

http.listen(port, function() {
    console.log('listening on *:'+port);
});
