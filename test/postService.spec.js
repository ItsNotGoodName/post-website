const {
    userService,
    postService
} = require('../src/services');
const {
    expect
} = require('chai');


describe('postService', () => {
    const username = 'User-postService';
    const password = '123';
    let user;
    let post;

    before(async () => {
        await userService.deleteUserByUsername(username);
        user = await userService.addUser(username, password);
        expect(user).to.not.equal(false)
    });

    after(async () => {
        await userService.deleteUserByUsername(user.username);
        const delUser = await userService.findUser(user.username);
        expect(delUser).to.be.null;
    });

    it('#addPost()', async () => {
        const title = 'Title';
        const body = 'Body';
        post = await postService.addPost(title, body, user);
        expect(post).to.have.property('title', title);
        expect(post).to.have.property('body', body);
        expect(post).to.have.property('vote', 0);
        expect(post).to.have.property('date');
    });
    it('#getPostById()', async () => {
        const foundPost = await postService.getPostById(post.id);
        expect(foundPost).to.have.property('title')
        expect(foundPost).to.have.property('title')
    });
    describe('#votePost()', () => {
        const refreshPost = async () => {
            post = await postService.getPostById(post.id, user);
        };

        const testVote = async (value, expectValue) => {
            await postService.votePost(post, user, value);
            await refreshPost();
            expect(post).to.have.property('vote', expectValue);
        }

        before(async () => {
            await refreshPost();
            expect(post).to.have.property('vote', 0);
        });

        beforeEach(async () => {
            await refreshPost();
        });

        it('upvote-upvote', async () => {
            await testVote(1, 1);
            await testVote(1, 0);
        })
        it('downvote-downvote', async () => {
            await testVote(-1, -1);
            await testVote(-1, 0);
        })
        it('upvote-downvote-downvote', async () => {
            await testVote(1, 1);
            await testVote(-1, -1);
            await testVote(-1, 0);
        })
        it('downvote-upvote-upvote', async () => {
            await testVote(-1, -1);
            await testVote(1, 1);
            await testVote(1, 0);
        })
    })
})