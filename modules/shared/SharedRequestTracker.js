const RequestTracker = require('../RequestTracker.js');

// Shared RequestTracker instance
// Allows all classes to interact with one RequestTracker instance
const sharedRequestTracker = new RequestTracker();


module.exports = sharedRequestTracker;