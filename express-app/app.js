const express = require('express');
const bodyParser = require('body-parser');

//crée de l'app express
const app = express()

//pour traitement des formulaires avant les routes
app.use(bodyParser.urlencoded({ extended : true }));

//pour les apis aussi
app.use(bodyParser.json());

//définie le dossier public
app.use(express.static(__dirname + '/public'));


//ROUTES : Après racine 
app.get('/', (req, res) => {
    res.send('Accueil');
})

app.get('/:firstanme/:lastname', (req, res) => {
    res.send(`bonjour ${req.params.firstanme} ${req.params.lastname}`);
})

//Gestion d'erreur si url non matché - app use , ordre important (middleware)
app.use((req, res) => {
    res.status(404);
    res.send('Page Introuvable');
})

// lance le serveur sur le port donné / A placer EN DERNIER
app.listen(8090, () => {
    console.log('lancement serveur test');
});