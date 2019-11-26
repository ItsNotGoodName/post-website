const router = require('express').Router();
const { postService } = require('../services');
const bcrypt = require('bcrypt')

router.get('/', async (req, res) => {
    posts = await postService.getPosts();
    res.render('index', {
        posts: posts,
        user: req.user
    });
});

module.exports = router;