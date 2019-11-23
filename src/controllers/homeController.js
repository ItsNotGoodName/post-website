const router = require('express').Router();
const services = require('../services')
const counterService = services.counterService
const postService = services.postService


router.get('/', (req, res)=> {
    res.render('index', {posts: postService.getPosts()});
})

router.get('/post', (req, res)=>{
    res.render('post', {posts: postService.getPosts()});
})

router.post('/post', (req, res)=>{
    console.log(req.body)
    if (req.body.title == undefined || req.body.title == '' ||
        req.body.body == undefined || req.body.body == '') {
        res.redirect('/post');
        return;
    }
    postService.addPost(req.body.title, req.body.body)
    res.redirect('/');
})

module.exports = router;