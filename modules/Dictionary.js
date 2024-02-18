class Dictionary {

    constructor () {
        this.wordArr = [];
    }

    
    // Usage: POST requests
    // Checks if the word exists before adding
    // Return value will dictate the postHandler response
    addWord(wordObj){
        
        // Log the attempted entry
        console.log(`Attempting to add ${JSON.stringify(wordObj)} to the dictionary.`);

        // Format entry before duplicate check
        let formattedEntry = this.formatEntry(wordObj);

        if (!this.checkForDuplicate(formattedEntry)){
            this.wordArr.push(formattedEntry);
            console.log(`"${formattedEntry.word}: ${formattedEntry.definition}" was successfully added to the dictionary.`);
            return true;
        } else {
            console.log(`Error: ${formattedEntry.word} already exists in the dictionary.`);
            return false;
        }
    }

    // Check the array for a duplicate word
    checkForDuplicate(wordObj){
        for (let term of this.wordArr){
            if (term.word === wordObj.word) {
                return true;
            }
        }
        return false;
    }

    // Capitalizes the first character of a word
    // Rest of the word is in lowercase
    formatWord(word){
        word = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        return word;
    }

    // Capitalizes the first character of a definition
    // Rest of the definition is in lowercase
    formatDefinition(definition){
        definition = definition.charAt(0).toUpperCase() + definition.slice(1).toLowerCase();
        return definition;
    }

    // Uses the formatWord and formatDefinition methods to preprocess new entry
    formatEntry(wordObj){
        wordObj.word = this.formatWord(wordObj.word);
        wordObj.definition = this.formatDefinition(wordObj.definition);
        return wordObj;
    }

    // Usage: GET requests
    // Used to return a requested work
    // Return value will dictate how the getHandler response
    getWord(word){

        // Log the GET request value
        console.log(`Attempting to find ${word} in the dictionary`);

        // Format word before searching
        let formattedWord = this.formatWord(word);
        for (let wordObj of this.wordArr){
            if (wordObj.word === formattedWord){
                console.log(`The word ${formattedWord} was successfully found.`);
                console.log(`${wordObj.definition}`);
                return wordObj;
            } 
        }

        // Log the failed search
        console.log(`Could not find the entry "${word}" in the dictionary` +'\n');
        return null;
    }

    // Returns the number entries in the dictionary
    getDictEntries(){
        const dictSize = this.wordArr.length;
        return `Dictionary Entries: ${dictSize}`;
    }
}

module.exports = Dictionary;