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

    async votePost(post, user, value){
        // TODO: Change updateOne to an increment function if mongodb has one
        await post.updateOne({vote: post.vote + value});
        await user.updateOne({vote: user.vote + value});
    } 

    async getPostById(id){
        if(!await mongoose.Types.ObjectId.isValid(id)){
            return false;
        }
        return await this.models.Post.findById(id);
    }
}

module.exports = PostService;