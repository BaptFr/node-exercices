const http = require('http');

//Crée le serveur
const server = http.createServer((req, res) => {
res.writeHead(200);
res.end('Salut tout le monde');
});

//lance le serveur
server.listen(8090, () => {
console.log('Serveur démarré sur le port 8080');
});