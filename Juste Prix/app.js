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
app.use(session({secret:'secretpass'}));

//Lancement formulaire
app.get('/', (req, res) => {
    res.render('form');
    console.log('Serveur démarré sur le port 8090');
})




//Lancement du jeu
app.get('/game', (req, res) => {
    console.log('SESSION playerTwo:', req.session.playerTwo);
    res.render('game',
        {
            playerTwo: req.session.playerTwo,
            objectName: req.session.objectName,
            objectValue: req.session.objectvalue,
            hight: false,
            low: false,
            equal:  false,
            essais: 0
        }
    )
});

//Traitement du formulaire Login
app.post('/game/add', (req, res) => {
    //récupération de données (req. body et pas params)
    let playerOne= req.body.playerOne;
    let playerTwo = req.body.playerTwo;
    let objectName = req.body.objectName;
    let objectValue = req.body.objectValue;
    

    if(!playerOne   || !playerTwo || !objectName || !objectValue){
        return res.render('form',{
                    erreurs: 'Remplir tous les chammps'
        });
    }else{
        //Enregistre les données saisies dans la session
        req.session.playerOne = playerOne;
        req.session.playerTwo = playerTwo;
        req.session.objectName = objectName;
        req.session.objectValue = objectValue;
    }
    //Redirect sur la page du jeu 
        res.redirect('/game');
});

app.post('/game/check', (req, res) => {
     //Récupération de la proposition du playerTwo
    let guess = req.body.newTry;
    //Comparaison proposition et bonne réponse
    let goodResponse = req.session.objectValue;
    let result = "";

    // Initialisation à False pour les resultats
    req.session.hight = false;
    req.session.low = false;
    req.session.equal = false;
    req.session.essais = 0

    if(guess<goodResponse) {
        req.session.hight = true;
        req.session.essais += 1;
    }else if(guess>goodResponse){
        req.session.low = true;
        req.session.essais += 1;
    }else if(guess == goodResponse){
        req.session.equal = true;
        req.session.essais += 1;
    };
    res.render('game',
        {
            playerTwo: req.session.playerTwo,
            objectName: req.session.objectName,
            objectValue: req.session.objectvalue,
            hight: req.session.hight,
            low: req.session.low,
            equal:  req.session.equal,
            essais: req.session.essais
        }
    )
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