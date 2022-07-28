const router = require('express').Router();
const { Post } = require('../../models');


router.get('/', (req, res) => {
    Post.findAll()
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id'});
            return 
        }
        res.json(dbPostData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

router.post('/', (req, res) => {
    Post.create({
        title: req.body.title,
        post_url: req.body.post_url,
        post_info: req.body.post_info,
        user_id: req.body.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

router.put('/:id', (req, res) => {
    Post.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id'});
            return 
        }
        res.json(dbPostData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id'});
            return 
        }
        res.json(dbPostData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})


module.exports = router;