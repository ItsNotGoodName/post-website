const router = require('express').Router();
const services = require('../services')
const postService = services.postService

router.get('/', (req, res) => {
    res.render('index', {
        posts: postService.getPosts()
    });
})

router.get('/post', (req, res) => {
    res.render('post', {
        posts: postService.getPosts()
    });
})

router.post('/post', (req, res) => {
    console.log(req.body)
    title = req.body.title;
    body = req.body.body;
    if (title == undefined || title == '' || body == undefined || body == '') {
        res.redirect('/post');
        return;
    }
    postService.addPost(title, body)
    res.redirect('/');
})

module.exports = router;