const router = require('express').Router();
const services = require('../services')
const authenticated = require('../middleware/authenticated');
const postService = services.postService

router.use(authenticated);

router.get('/', async (req, res) => {
    res.render('post');
})

router.post('/', async (req, res) => {
    title = req.body.title;
    body = req.body.body;
    if (title == undefined || title == '' || body == undefined || body == '') {
        res.redirect('/post');
        return;
    }
    await postService.addPost(title, body, req.user)
    res.redirect('/');
})

module.exports = router;