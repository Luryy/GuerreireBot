var http = require('http');

var port = process.env.PORT || 3000;

require('./src/bots');

http.createServer(function(req,res){
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({name: 'teste-bot', ver: '1.0.0'}));
    res.end();
}).listen(port)
