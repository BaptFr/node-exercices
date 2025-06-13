const userApiService = require("../services/userApiService");
const User = require("../models/user");
const bcrypt = require("bcrypt");
// récupére la liste des users
module.exports.getUsers = async (req, res) => {
    try{
        let users = await userApiService.getUsers({});
        return res.status(200).json({status: 200, data: users, message: "Succesfully Users received"});
    } catch(e) {
        return res.status(400).json(json({status: 400, message, message: e.message}));
    }
};
// récupère un user suivant son id
module.exports.getUser = async(req, res) => {
    try{
        let user = await userApiService.getUser({_id: req.params.id});
        return res.status(200).json({status: 200, data: user, message: "Succesfully User received"});
    } catch(e) {
        return res.status(400).json(json({status: 400, message, message: e.message}));
    }
};
// crée une user
module.exports.createUser = async (req, res) => {
    
    try{
        // hash le mdp avec bcrypt
        let salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        let user = new User(req.body);
        user = await userApiService.createUser(user);
        return res.status(201).json({status: 201, data: user, message: "Successfully User created"});
    } catch(e) {
        return res.status(400).json({ status: 400, message: e.message});
    }
}
// update un user
module.exports.updateUser = async (req, res) => {
    try{
        // hash le mdp avec bcrypt
        let salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        let result = await userApiService.updateUser({_id: req.params.id}, req.body);
        return res.status(200).json({status: 200, data: result, message: "Successfully User updated"})
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message})
    }
}
// supprime un user
module.exports.deleteUser = async (req, res) => {
    try{
        let user = await userApiService.deleteUser({_id: req.params.id});
        return res.status(200).json({status: 200, message: "Successfully delete User"});
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message});
    }
}