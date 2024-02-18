const sharedDict = require('../modules/shared/SharedDictionary.js');
const Word = require('../modules/Word.js');
const sharedRequestTracker = require('../modules/shared/SharedRequestTracker.js');
const En = require('../lang/en/en.js');


const Strings = new En();

// Handles POST requests
// Adds the request body in chunks and attempts to add the word to the sharedDictionary
function postHandler(req, res){
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        
        try {

            // Parse the request body
            let reqContents = JSON.parse(body);
            let wordObj = new Word(reqContents.word, reqContents.definition);
            // Checks for duplicates before adding
            if (!sharedDict.addWord(wordObj)){
                res.end(JSON.stringify({ error: Strings.duplicateWord }));
            } else {
                
                const numServerRequests = sharedRequestTracker.getRequestTotal();
                const totalEntries = sharedDict.getDictEntries();
                const word = sharedDict.formatEntry(wordObj);

                const responseObj = `${numServerRequests}<br>${totalEntries}<br>New Entry: "${word.word}: ${word.definition}"`;


                console.log(`A response to the client was successfully generated from the POST request: ${JSON.stringify(responseObj)}}` + '\n');
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: responseObj }));
            }

        // Sends an error message if the request if there is an error
        } catch (err) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err }));
        }
    });
}

module.exports = postHandler;