const {
    userService,
    postService
} = require('../src/services');


describe('postService', () => {
    const assert = require('chai').assert
    const username = 'TestUser';
    const password = '123';
    let user;
    let post;

    before(() => {
        return new Promise(async (resolve) => {
            user = await userService.findUser(username);
            if (user === null) {
                user = await userService.addUser(username, password);
                assert.notEqual(user, false)
            }
            resolve();
        });
    });

    it('#addPost', () => {
        return new Promise(async (resolve) => {
            post = await postService.addPost('Test', 'Test', user);
            assert.equal(post.title, 'Test');
            resolve();
        });
    });
    it('#getPostById', () => {
        return new Promise(async (resolve) => {
            const foundPost = await postService.getPostById(post.id);
            assert.equal(foundPost.title, post.title);
            assert.equal(foundPost.body, post.body);
            assert.equal(foundPost.vote, post.vote);
            resolve();
        });
    });
    describe('#votePost', () => {
        it('upvote-unvote post', () => {
            return new Promise(async (resolve) => {
                resolve()
            });
        })
        it('upvote-downvote post', () => {
            return new Promise(async (resolve) => {
                resolve()
            });
        })
    })
})