const http = require('http');

//Crée le serveur
const server = http.createServer((req, res) => {
    //crée le header aveccode http 200
    res.writeHead(200);
    //renvoi ici le body'salut tou le monde'
    res.end('Salut tout le monde');
});

//lance le serveur
server.listen(8090, () => {
console.log('Serveur démarré sur le port 8090');
});