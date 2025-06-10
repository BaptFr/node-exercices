const express = require('express');
const bodyParser = require('body-parser');
const session = require('cookie-session');

//crée de l'app express
const app = express()

//Définition du moteur de rendu
app.set('view engine', 'ejs');

//définir dossier pour les vues
app.set('views', __dirname + '/views');

//pour traitement des formulaires avant les routes
app.use(bodyParser.urlencoded({ extended: true }));

//pour les apis aussi
app.use(bodyParser.json());

//définie le dossier public
app.use(express.static(__dirname + '/public'));

//crée session
app.use(session({secret:'secretpass'}))
//ROUTES : Après racine 
app.get('/', (req, res) => {
    res.render('index'),
    {
        login: req.session.login
    }
})

app.get('/:firstanme/:lastname', (req, res) => {
    res.render('bonjour',
        {
            firstname: req.params.firstanme,
            lastname: req.params.lastname
        }
    );
})

// pour formulaire login
app.get('/:login', (req, res) => {
    res.render('login')
})
//Traitement du formulaire Login
app.post('/login', (req, res) => {
    //récupération de données (req. body et pas params)
    let login = req.body.login; // c'est la 'name' des inputs
    let password = req.body.password;

    //effectue les vérififcation
    if(login == "" || password == ""){
        res.render('login',
            {
                erreurs: 'LOGIN OU MOT DE PASSE INCORRECT !'
            }
        )
    }else{
        //enregistre dans la session login
        req.session.login = login;

        //redirige sur la page d'accueil
        res.redirect('/');
    }
});

//Gestion d'erreur si url non matché - app use , ordre important (middleware)
app.use((req, res) => {
    res.status(404);
    res.send('Page Introuvable');
})

// lance le serveur sur le port donné / A placer EN DERNIER
app.listen(8090, () => {
    console.log('lancement serveur test');
});