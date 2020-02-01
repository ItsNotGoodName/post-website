const router = require('express').Router();
const {
    forwardAuthenticated
} = require('../middleware/authentication');
const {
    postService
} = require('../services');

const {
    postValidator,
    postDeleteValidator,
    checkErrors
} = require('../middleware/validator');
router.use(forwardAuthenticated);

router.get('/', async (req, res) => {
    res.render('post');
});

router.post('/', postValidator, checkErrors('/post'), async (req, res) => {
    const {
        title,
        body
    } = req.body;

    await postService.addPost(title, body, req.user);
    res.redirect('/');
});

router.post('/vote', async (req, res) => {
    id = req.body.id;
    vote = req.body.vote;
    user = req.user;

    post = await postService.getPostById(id);

    if (!post) {
        res.status(404);
        res.send('Post not found');
        return;
    }

    if (vote == 'upvote') {
        await postService.votePost(post, user, 1)
    } else if (vote == 'downvote') {
        await postService.votePost(post, user, -1)
    }

    res.redirect('/' + "#" + id);
});

router.post('/delete', postDeleteValidator, checkErrors('/'), async (req, res) => {
    const {
        id
    } = req.body;

    const post = await postService.getPostById(id);

    if (!post) {
        res.redirect(req.headers.referer);
        return;
    }

    if (!post.postedBy.equals(req.user._id)) {
        res.redirect(req.headers.referer);
        return;
    }

    await postService.deletePost(post);
    res.redirect(req.headers.referer)
});

module.exports = router;