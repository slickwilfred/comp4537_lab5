const serverDate = require('./ServerDate.js');


class RequestTracker {
    constructor(){
        this.count = 0;
    }

    // Sets the total number of requests to the server
    incrementCount(){
        this.count++;
    }

    // Returns the total number of requests to the server
    getRequestTotal() {
        const dateObj = new serverDate();
        const currentDay = dateObj.getDate();
        const numReqs = this.count;

        const total = `Server Request #${numReqs}: Updated on ${currentDay}`;
        return total;
    }
}

module.exports = RequestTracker;