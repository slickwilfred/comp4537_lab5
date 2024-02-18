const http = require('http');
const url = require('url');
const PORT = 8888;
const HOST = '127.0.0.1';

const sharedTracker = require('./modules/shared/SharedRequestTracker.js');
const getHandler = require('./routes/getHandler.js');
const postHandler = require('./routes/postHandler.js');
const errorHandler = require('./routes/errorHandler.js');


const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS'){
        res.writeHead(204);
        res.end();
        return;
    }


    try {

        // Add to the total number of Server requests
        sharedTracker.incrementCount();

        if (req.method == 'GET'){
            console.log('GET method called...');
            getHandler(req, res);
        } else if (req.method == 'POST'){
            console.log('POST method called...')
            postHandler(req, res);
        } else {
            errorHandler(req, res);
        }
    } catch (err) {
        console.log(err);
    }
});


server.listen(PORT, HOST, () => {
    console.log(`Server is listening on ${PORT}...` + '\n');
})