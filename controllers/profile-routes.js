const router = require('express').Router();
const {User, Post} = require('../models')


router.get('/:username', (req, res) => {
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
            res.status(404).end();
            return;
        }

        const date = new Date();
  
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


router.get('/post/edit/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(viewPostData => {

        if(!viewPostData) {
            res.status(404).end();
            return;
        } 

        console.log(req.session, viewPostData);

        if (req.session.user_id !== viewPostData.user_id) {
            res.status(403).end();
            return;
        } else {
            const post = viewPostData.get({ plain: true});

            res.render('edit', {post, loggedIn: req.session.loggedIn, username: req.session.username})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

module.exports = router;