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
    let page = 1
    let [posts, maxPage] = await Promise.all([postService.getPosts(page, req.user), postService.getNumPage(page)]);
    res.render('index', {
        posts,
        page,
        maxPage
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

        let [posts, maxPage] = await Promise.all([postService.getPosts(page, req.user), postService.getNumPage(page)]);

        res.render('index', {
            posts,
            page: Number(page),
            maxPage
        });
    });

router.get('/test', async (req, res) => {
    res.render('test');
});

module.exports = router;