const mongoose = require('mongoose');

class PostService {
    constructor(models) {
        this.models = models;
    }
    async addPost(title, body, user) {
        const post = new this.models.Post({
            _id: new mongoose.Types.ObjectId(),
            title: title,
            body: body,
            postedBy: user._id
        });
        await post.save();
    }
    async getPosts() {
        const posts = await this.models.Post.find({}).sort('-date').populate('postedBy','username').exec();
        return posts;
    }
}

module.exports = PostService;