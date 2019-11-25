const fs = require('fs');
const http = require('http');
const https = require('https');
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect('mongodb://' + process.env.MONGO_URL + '/' + process.env.MONGO_DB, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(
	resolve =>{
		console.log()
		console.log("DB connected");
	},
	reject => {
		console.log("Can't connect to DB");
	}
)

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
	const httpPort = process.env.HTTPPORT || 8080
	const httpsPort = process.env.HTTPSPORT || 8443;
	const cert_key_path = "cert_key";

	const app = require('./src');

	const httpServer = http.createServer(app);

	httpServer.listen(httpPort, () => {
		console.log("HTTP server running on port: " + httpPort);
	});

	if (fs.existsSync(cert_key_path)) {
		const privateKey = fs.readFileSync('cert_key/key.pem', 'utf8');
		const certificate = fs.readFileSync('cert_key/cert.pem', 'utf8');

		const credentials = {
			key: privateKey,
			cert: certificate
		};
		const httpsServer = https.createServer(credentials, app);

		httpsServer.listen(httpsPort, () => {
			console.log("HTTPS server running on port: " + httpsPort);
		});
	}
});