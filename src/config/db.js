const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://'+ process.env.MONGO_USER + ':' + process.env.MONGO_PASS + "@" + process.env.MONGO_URL, {
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