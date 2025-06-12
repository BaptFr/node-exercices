const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt  = require('bcrypt');

//Route récupération users
router.route('/users')
    .get((req, res) => {
        User.find()
            .then((data) => res.status(200).json(data))
            .catch((error) => res.status(400).json(error))
});

//Route récupération tasks
router.route('/tasks')
    .get((req, res) => {
        User.find()
            .then((data) => res.status(200).json(data))
            .catch((error) => res.status(400).json(error))
});

router.route('/:id')
    .get((req, res) => {
        User.findOne({ _id: req.params.id})
            .then((data) => res.status(200).json(data))
            .catch((error) => res.status(400).json(error))
});

//Route pour ajouter un user : localhost/api/user + json
router.route('/')
    .post(async (req, res) => {
        // hash le mdp avec bcrypt qui est dans le module bcrypt
        let salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        // crée le user
        let user = new User(req.body);
        user.save()
            .then((data) => res.status(201).json(data))
            .catch((err) => res.status(400).json(err));
});

//Route pour modifier un user
router.route("/:id")
    .put(async (req, res) => {
    // hash le mdp avec bcrypt qui est dans le module bcrypt
    let salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    //met à jour le user
    User.updateOne({_id: req.params.id}, req.body)
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));
});

//Route pour supprimer un user
router.route("/:id")
    .delete((req, res) => {
        User.deleteOne({ _id: req.params.id})
            .then((data) => res.status(200).json(data))
            .catch((error) => res.status(400).json(error))
});

// Export des routes contenu dans le router
module.exports = router