const router = require('express').Router();
const { postService } = require('../services');

router.get('/', async (req, res) => {
    posts = await postService.getPosts();
    res.render('index', {
        posts: posts
    });
});

module.exports = router;