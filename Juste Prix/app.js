const express = require('express');
const bodyParser = require('body-parser');
const session = require('cookie-session');

//app express
const app = express()

//Définition du moteur de rendu
app.set('view engine', 'ejs');
//définir dossier pour les vues
app.set('views', __dirname + '/views');

//pour traitement des formulaires avant les routes
app.use(bodyParser.urlencoded({ extended: true }));

//Création session
app.use(session({secret: 'secretpass'}));

//Lancement formulaire
app.get('/', (req, res) => {
    res.render('form');
    console.log('Serveur démarré sur le port 8090');
})


//Traitement du formulaire Login
app.post('/', (req, res) => {
    //récupération de données (req. body et pas params)
    let playerOne= req.body.playerTwo;
    let playerTwo = req.body.playerTwo;
    let objectName = req.body.objectName;
    let objectValue = req.body.objectValue;
    if(playerOne == ""  || playerTwo == "" || objectName == "" || objectValue == ""){
        res.render('/',
            {
                erreurs: 'Remplir tous les chammps'
            }
        )
    }else{
        //Enregistre les données saisies dans la session
        req.session.playerOne = playerOne;
        req.session.playerTwo = playerTwo;
        req.session.objectName = objectName;
        req.session.objectValue = objectValue;
    }
    //Redirect sur la page du jeu 
    res.redirect('/game/add/');
});

//Lancement du jeu
app.get('/game/add', (req, res) => {
    res.render('game',
        {
            playerTwo: req.session.playerTwo
        }
    )
});

app.post('/game/add', (req, res) => {
    //Récupération de la proposition du playerTwo
    let guess = req.body.newTry;
    //Comparaison proposition et bonne réponse

    let goodResponse = req.session.game.objectValue;
    let result = ""
    if(guess>goodResponse) {
        result = 'high'
    }else if(guess<goodResponse){
        result = 'low'

    }else if(guess == goodResponse){
        result = 'equal'

    }
    return result;
});


//Gestion d'erreur  URL - !!ordre(middleware)
app.use((req, res) => {
    res.status(404);
    res.send('Page introuvable');
})

// lance le serveur sur le port donné / A placer EN DERNIER
app.listen(8090, () => {
    console.log('lancement serveur test');
});