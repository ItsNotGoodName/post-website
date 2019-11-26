const mongoose = require('mongoose')

mongoose.connect('mongodb://' + process.env.MONGO_URL + '/' + process.env.MONGO_DB, {
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