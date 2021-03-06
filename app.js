const http = require('http');
const path = require('path');
if (process.env.NODE_ENV === 'production') {
	require('dotenv').config()
} else if (process.env.NODE_ENV === 'development') {
	require('dotenv').config({
		path: path.resolve(process.cwd(), 'dev.env')
	})

} else {
	require('dotenv').config({
		path: path.resolve(process.cwd(), 'test.env')
	})
}
const db = require('./src/config/db').connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
	const httpPort = process.env.PORT || 8080

	const app = require('./src');

	const httpServer = http.createServer(app);

	httpServer.listen(httpPort, () => {
		console.log("HTTP server running on port: " + httpPort);
	});
});