const Word = require('../modules/Word.js');
const RequestTracker = require('../modules/RequestTracker.js');
const En = require('../lang/en/en.js');

const Strings = new En();

function errorHandler(req, res){
    
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: Strings.badRequest }));

}

module.exports = errorHandler;