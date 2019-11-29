const router = require('express').Router();
const {
    forwardAuthenticated
} = require('../middleware/authentication');
const {
    postService
} = require('../services');

router.use(forwardAuthenticated);

router.get('/', async (req, res) => {
    res.render('post');
});

router.post('/', async (req, res) => {
    title = req.body.title;
    body = req.body.body;
    if (title == undefined || title == '' || body == undefined || body == '') {
        res.redirect('/post');
        return;
    }
    await postService.addPost(title, body, req.user)
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

    res.redirect('/');
});

module.exports = router;