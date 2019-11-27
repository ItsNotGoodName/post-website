const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_PREPEND +'://'+ process.env.MONGO_USER + ':' + process.env.MONGO_PASS + "@" + process.env.MONGO_URL + '/' + process.env.MONGO_DB, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(
	resolve =>{
		console.log("DB connected");
	},
	reject => {
		console.log("Can't connect to DB");
	}
)

module.exports = mongoose;