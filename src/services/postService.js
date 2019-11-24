const mongoose = require('mongoose');

class PostService {
    constructor(models) {
        this.models = models;
    }
    async addPost(title, body) {
        const post = new this.models.Post({
            _id: new mongoose.Types.ObjectId(),
            title: title,
            body: body
        });
        await post.save();
    }
    async getPosts() {
        const posts = await this.models.Post.find({}).exec();
        return posts;
    }
}

module.exports = PostService;