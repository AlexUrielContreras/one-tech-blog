const router = require('express').Router();
const { User, Post, Comment } = require('../../models');


// Get all Users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password']}
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

// Get One User
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['title', 'post_url', 'post_info']
            },
            {
                model: Comment,
                attributes: ['comment_text'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            }
        ]
    })
    .then(dbUserData => {
        if (!dbUserData){
            res.status(404).json({ message: 'No user with this id '});
            return
        }

        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

// Create User
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => {
        
        req.session.save(() => {
            req.session.user_id = dbUserData.id,
            req.session.username = dbUserData.username,
            req.session.email = dbUserData.email
            req.session.loggedIn = true

            console.log(req.session)

            res.json(dbUserData)
           
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
});

// Update User
router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user with this id'})
            return
        }
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })

});

// Delete User
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user with this id'})
            return
        }
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
});


router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(dbUserData => {
        if (!dbUserData){
            res.status(404).json({ message: 'no user found with that email '});
            return 
        }
        
        const validPw = dbUserData.checkPassword(req.body.password)
        console.log(validPw)

        if (!validPw) {
            res.status(400).json({ message: 'Incorrect Password'});
            return
        }

        res.json({ dbUserData, message: 'You are now logged in! '})

    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
})


module.exports = router