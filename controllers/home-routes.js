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
                attributes: ['comment_text']
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
        }
    })
    .then(dbUserData => {

        const date = new Date().getHours();

        const user = dbUserData.get({plain: true});


        if (req.params.username === req.session.username) {
            res.render('profile', {user,  date, loggedIn: req.session.loggedIn, isUser: req.session.isUser})
        } else {
            res.render('profile', {user, loggedIn: req.session.loggedIn, isUser: false, username: req.session.username})
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
})







module.exports = router