const router = require('express').Router();
const services = require('../services')
const postService = services.postService

router.get('/', async (req, res) => {
    posts = await postService.getPosts();
    res.render('index', {
        posts: posts
    });
})

module.exports = router;