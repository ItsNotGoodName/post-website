const fs = require('fs');
const http = require('http');
const https = require('https');
const privateKey  = fs.readFileSync('cert_key/key.pem', 'utf8');
const certificate = fs.readFileSync('cert_key/cert.pem', 'utf8');
require('dotenv').config()

const httpPort = process.env.HTTPPORT || 8080
const httpsPort = process.env.HTTPSPORT || 8443;

const credentials = {key: privateKey, cert: certificate};

const app = require('./src');

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(httpPort, ()=>{
	console.log("HTTP server running on port: " + httpPort);
});

httpsServer.listen(httpsPort, ()=>{
	console.log("HTTPS server running on port: " + httpsPort);
});