const mongoose = require('mongoose');
const User = require('./models/user')

//Pour l'exercice pas de .env
mongoose.connect('')
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

let user2 = new User({
    firstName: "Jean",
    lastName: "Valjean",
    email: "jvj@gmail.com",
    password: "12345",
});

// //Création d'un objet
// user2.save()
//  .then((data) => console.log(data))
//  .catch((error) => console.log(error));

// //Récupère tous les objets
// User.find()
//     .then((data) => console.log(data))
//     .catch((error) => console.log(error));

// //Récupère x1 objet
// User.findOne({_id:"684a8b5000c124e6fbddd2b8" })
//     .then((data) => console.log(data))
//     .catch((error) => console.log(error));

// //Màj x1 objet
// User.updateOne({_id:""}, {password:""})
//     .then((data) => console.log(data))
//     .catch((error) =>console.log(error));

// //Suppr. un objet
// User.deleteOne({_id:""})
//     .then((data) => console.log(data))
//     .catch((error) => ocnsole.log(error));

