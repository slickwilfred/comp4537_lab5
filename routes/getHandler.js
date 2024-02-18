const url = require('url');

const sharedDict = require('../modules/shared/SharedDictionary.js');
const sharedRequestTracker = require('../modules/shared/SharedRequestTracker.js');
const En = require('../lang/en/en.js');

const Strings = new En();

// Parse GET requests
// If the word exists, return the term and defintion
async function getHandler(req, res){
    const parsedURL = url.parse(req.url, true);
    const query = parsedURL.query;
    const wordQuery = query.word;
    try {
        const wordObj = await sharedDict.getWord(wordQuery);

        // Check if the word exists
        // If it exists, return the word
        if (!wordObj == null) {
            
            // Log the failed request
            console.log("The GET request word was null");
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ definition: Strings.nullValue }));

        } else if (sharedDict.getWord == null){

            // Log the failed search
            console.log(`The word: ${wordObj} could not be found`);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ definition: Strings.wordNotFound }));

        } else {

            const numServerRequests = sharedRequestTracker.getRequestTotal();
            const word = wordObj;

            const responseObj = `${numServerRequests}<br>Definition: ${word.definition}`;

            // Log the success of the request
            console.log(`A response to the client was successfully generated from the GET request: "${wordObj.word}: ${wordObj.definition}"` + '\n');
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: responseObj }));
        }
    } catch (err) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: Strings.wrongFormat }));
    }
}

module.exports = getHandler;