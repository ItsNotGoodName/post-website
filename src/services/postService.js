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
        return post;
    }
    async getNumPage() {
        let count = await this.models.Post.count({});
        return Math.floor((count - 1) / this.pageOffset) + 1

    }
    async getPosts(page = 1, user = undefined) {
        if (typeof user === "undefined") {
            return await this.models.Post
                .find({})
                .sort('-date')
                .skip((page - 1) * this.pageOffset)
                .limit(this.pageOffset)
                .populate('postedBy', 'username')
                .slice('voters', 0)
                .exec();
        }

        const posts = await this.models.Post
            .find({}, { // IDK I need help
                title: 1,
                vote: 1,
                body: 1,
                username: 1,
                date: 1,
                postedBy: 1,
                voters: {
                    $elemMatch: {
                        user
                    }
                }
            })
            .sort('-date')
            .skip((page - 1) * this.pageOffset)
            .limit(this.pageOffset)
            .populate('postedBy', 'username')
            .exec();
        return posts;
    }

    async _vote(value, post) {
        return Promise.all([
            post.update({
                $inc: {
                    vote: value
                }
            }),
            this.models.User.findOneAndUpdate({
                _id: post.postedBy
            }, {
                $inc: {
                    vote: value
                }
            })
        ])
    }

    async votePost(post, user, value) {
        let p = await this.models.Post.findOne({
            _id: post._id
        }, {
            voters: {
                $elemMatch: {
                    user
                }
            }
        })
        if (p.voters.length == 0) {
            // new vote
            await this.models.Post.update({
                _id: post._id
            }, {
                $push: {
                    voters: {
                        user,
                        value
                    }
                }
            });
        } else {
            if (value == p.voters[0].value) {
                // unvote
                value = -value
                await this.models.Post.update({
                    _id: p._id
                }, {
                    $pull: {
                        voters: {
                            _id: p.voters[0]._id
                        }
                    }
                });
            } else {
                // change vote
                p.voters[0].value = value;
                await this.models.Post.update({
                    _id: p._id
                }, {
                    $set: {
                        voters: {
                            user,
                            value
                        }
                    }
                });
                value += value
            }
        }
        this._vote(value, post);
    }

    async getPostById(id) {
        if (!await mongoose.Types.ObjectId.isValid(id)) {
            return false;
        }
        return await this.models.Post.findById(id)
            .slice('voters', 0);
    }
}

module.exports = PostService;