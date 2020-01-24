const {
    userService,
    postService
} = require('../src/services');
const {
    expect
} = require('chai');


describe('postService', () => {
    const username = 'TestUser';
    const password = '123';
    let user;
    let post;

    before(async () => {
        user = await userService.findUser(username);
        if (user === null) {
            user = await userService.addUser(username, password);
            expect(user).to.not.equal(false)
        }
    });

    it('#addPost', async () => {
        post = await postService.addPost('Test', 'Test', user);
        expect(post).to.have.property('title', 'Test');
    });
    it('#getPostById', async () => {
        const foundPost = await postService.getPostById(post.id);
        expect(foundPost).to.have.property('title')
    });
    describe('#votePost', () => {
        beforeEach(async () => {
            post = await postService.getPostById(post.id);
        });

        it('upvote-unvote', async () => {
            await postService.votePost(post, 1);
            expect(await postService.getPostById(post.id)).to.have.property('vote', 1);
        })

        it('upvote-downvote', async () => {})
    })
})