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

        const posts = viewPostData.map(post => post.get({ plain: true }));

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
        return
    }

    res.render('signup')
})

router.get('/profile/:username', (req, res) => {
    User.findOne({
        where: {
            username: req.params.username
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_info']
            }
        ]
    })
    .then(dbUserData => {

        if (!dbUserData) {
            res.status(404).end()
            return
        }

        const date = new Date().getHours();
  
        const user = dbUserData.get({plain: true});

        if (req.params.username === req.session.username) {
            res.render('profile', {user, date, loggedIn: req.session.loggedIn, isUser: req.session.isUser, username: req.session.username})
        } else {
            res.render('profile', {user, loggedIn: req.session.loggedIn, isUser: false, username: req.session.username})
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
});

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
            return
        }

        const post = viewPostData.get({ plain: true });

        res.render('single-post', {post, loggedIn: req.session.loggedIn, username: req.session.username})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

router.get('/post/edit/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(viewPostData => {

        const post = viewPostData.get({ plain: true})
        res.render('edit', {post, loggedIn: req.session.loggedIn, username: req.session.username})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})







module.exports = router