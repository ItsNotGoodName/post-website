const router = require('express').Router();
const services = require('../services')
const postService = services.postService

router.get('/', async (req, res) => {
    posts = await postService.getPosts();
    res.render('index', {
        posts: posts
    });
})

router.get('/post', async (req, res) => {
    res.render('post');
})

router.post('/post', async (req, res) => {
    title = req.body.title;
    body = req.body.body;
    if (title == undefined || title == '' || body == undefined || body == '') {
        res.redirect('/post');
        return;
    }
    await postService.addPost(title, body)
    res.redirect('/');
})

module.exports = router;