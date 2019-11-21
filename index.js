var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('cert_key/key.pem', 'utf8');
var certificate = fs.readFileSync('cert_key/cert.pem', 'utf8');
var httpPort = 8080
var httpsPort = 8443;

var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app = express();

var requests_made = 0

app.get('/', (req, res)=> {
    requests_made+=1
    res.send("<p>Hello</p><p>Requests Made: " + requests_made + "</p>");
})

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(httpPort, ()=>{
	console.log("HTTP server running on port: " + httpPort);
});

httpsServer.listen(httpsPort, ()=>{
	console.log("HTTPS server running on port: " + httpsPort);
});