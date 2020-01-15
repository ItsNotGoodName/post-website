const mongoose = require('mongoose');

class PostService {
    constructor(models) {
        this.models = models;
        this.pageOffset = 20
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
    async getNumPage() {
        let count = await this.models.Post.count({});
        return Math.floor((count - 1) / this.pageOffset) + 1

    }
    async getPosts(page) {
        if (typeof page == undefined) {
            const posts = await this.models.Post.find({}).sort('-date').populate('postedBy', 'username').exec();
            return posts;
        }

        const posts = await this.models.Post.find({}).sort('-date').skip((page - 1) * this.pageOffset).limit(this.pageOffset).populate('postedBy', 'username').exec();
        return posts;
    }

    async votePost(post, user, value) {
        await post.updateOne({
            $inc: {
                vote: value
            }
        });
        await this.models.User.findOneAndUpdate({
            _id: post.postedBy
        }, {
            $inc: {
                vote: value
            }
        });
    }

    async getPostById(id) {
        if (!await mongoose.Types.ObjectId.isValid(id)) {
            return false;
        }
        return await this.models.Post.findById(id);
    }
}

module.exports = PostService;