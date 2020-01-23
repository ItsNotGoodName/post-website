const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(
	resolve => {},
	reject => {}
)

module.exports = mongoose;