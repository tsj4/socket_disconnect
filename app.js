var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
        
app.get('/', function(req, res) {
    res.sendfile('index.html');
});

io.on('connection', function(socket) {
    console.log('a user connected');

    socket.on("foo", function (data) {
        console.log("message : ", data);
    });

    setTimeout(function () {
        socket.disconnect(true);     
    }, 30000);

    socket.on("disconnect", function() {
        console.log("a user disconnected"); 
    });

    
});

http.listen(port, function() {
    console.log('listening on *:'+port);
});
