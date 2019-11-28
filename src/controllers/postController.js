const router = require('express').Router();
const { forwardAuthenticated }= require('../middleware/authentication');
const { postService } = require('../services');
const { sanitizeBody, body } = require('express-validator');

router.use(forwardAuthenticated);

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