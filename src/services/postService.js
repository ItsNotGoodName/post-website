const mongoose = require('mongoose');

class PostService {
    constructor(models) {
        // this.posts = []
        this.models = models;
    }
    async addPost(title, body) {
        console.log(this.models)
        const post = new this.models.Post({
            _id: new mongoose.Types.ObjectId(),
            title: title,
            body: body
        });
        await post.save();
        /*
        this.posts.push({
            title: title,
            body: body
        });
        */
    }
    async getPosts() {
        const posts = await this.models.Post.find({}).exec()
        return posts;
        /*
        return this.posts;
        */
    }
}

module.exports = PostService;