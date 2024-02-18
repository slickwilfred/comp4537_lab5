const Dictionary = require('../Dictionary.js');
const Word = require('../Word.js');

// Shared dictionary instance
// Allows all classes to interact with one dictionary instance
const sharedDict = new Dictionary();


module.exports = sharedDict;