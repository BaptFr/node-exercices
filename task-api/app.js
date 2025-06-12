const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv  = require ('dotenv');
const userApiRoute = require ('./routes/userApiRoute');

//Création appli express
const app = express();

//Charger variables d'environnement
dotenv.config()

//Utile pour API
app.use(bodyParser.json());

//Connection DB
mongoose.connect(process.env.MONGO_CONNECTION)
    .then(()=>console.log('Connection DB réussie'))
    .catch((error) => console.log(error));

//Import des routes  attention ORDRE
app.use('/api/user/', userApiRoute);

//Lancement server
app.listen(process.env.PORT, () => {
    console.log(`Serveur démarré port: ${process.env.PORT}`)
});





