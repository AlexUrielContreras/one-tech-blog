const router = require('express').Router();
const { User } = require('../../models');



router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
});

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});



module.exports = router