const router = require('express').Router();
const {
    validationResult
} = require('express-validator');
const {
    pageValidator
} = require('../middleware/validator')
const {
    postService
} = require('../services');

router.get('/', async (req, res) => {
    posts = await postService.getPosts();
    res.render('index', {
        posts,
        page: 1
    });
});

router.get('/page/:page',
    pageValidator,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            });
        }

        page = req.params.page

        posts = await postService.getPosts(page);

        res.render('index', {
            posts,
            page: Number(page)
        });
    });

router.get('/test', async (req, res) => {
    res.render('test');
});

module.exports = router;