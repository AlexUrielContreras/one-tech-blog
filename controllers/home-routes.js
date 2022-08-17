const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/', (req, res) => {
    Post.findAll({ 
        include: [
            {
                model: User,
                attributes: ['username']
            }, 
            {
                model: Comment,
                attributes: ['id', 'comment_text']
            }
        ]
    })
    .then(viewPostData => {

        console.log(viewPostData)
        const posts = viewPostData.map(post => post.get({ plain: true }));
        console.log(posts)
        res.render('homepage' , {posts, loggedIn: req.session.loggedIn, username: req.session.username})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('signup')
})

router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id','comment_text','user_id', 'post_id', 'createdAt'],
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            }
        ]
    })
    .then(viewPostData => {
        if (!viewPostData) {
            res.status(404).end();
            return;
        }

        const post = viewPostData.get({ plain: true });

        res.render('single-post', {post, loggedIn: req.session.loggedIn, username: req.session.username})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});






module.exports = router