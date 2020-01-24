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

const homeRender = async (req, res) => {
    let [posts, maxPage] = await Promise.all([postService.getPosts(res.locals.page, req.user), postService.getNumPage(res.locals.page)]);
    res.render('index', {
        posts,
        page: Number(res.locals.page),
        maxPage
    });
}

router.get('/', async (req, res, next) => {
    res.locals.page = 1;
    next();
}, homeRender);

router.get('/page/:page',
    pageValidator,
    async (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    errors: errors.array()
                });
            }

            res.locals.page = req.params.page;
            next();
        },
        homeRender
);

router.get('/test', async (req, res) => {
    res.render('test');
});

module.exports = router;