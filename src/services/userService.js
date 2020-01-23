const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

class UserService {
    constructor(models) {
        this.models = models;
    }

    async getAllUsers() {
        return await this.models.User.find({}).sort('-vote').exec();
    }

    async deleteUserByUsername(username) {
        return await this.models.User.findOneAndDelete({
            username
        });
    }

    async addUser(username, password) {
        const userExists = await this.models.User.findOne({
            username: username
        }).exec();

        if (userExists !== null) {
            return false;
        } else {
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password, salt);
            const user = await this.models.User({
                _id: new mongoose.Types.ObjectId(),
                username: username,
                password: hash
            }).save();
            return user;
        }
    }

    async findUser(username) {
        return await this.models.User.findOne({
            username: username
        });
    }
}

module.exports = UserService;