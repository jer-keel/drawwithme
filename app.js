// Import all necessary NodeJS modules
var http = require('http');
    path = require('path');
    socketio = require('socket.io');
    express = require('express');

// Start express, the server, and socket.io
var router = express();
    server = http.createServer(router);
    io = socketio.listen(server);

// Set the static file path to the public directory
router.use(express.static(path.resolve(__dirname, "public")));

// Catch anything that tries to connect to the server and serve up the single
// page app located at public/index.html
router.get("/*", function(req, res) {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

// Catch anything that might want to see all of the components that way in case 
// we need to change the above route this still prvents people from peeking
router.get("/components/*", function(req, res) {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

// Start the server (taken from Andy which is taken from Cloud9)
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  var address = server.address();
  console.log("Server is now started on ", address.address + ":" + address.port);
});
