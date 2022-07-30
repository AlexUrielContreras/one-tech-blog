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
        
        console.log(posts)

        res.render('homepage' , {posts})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})








module.exports = router