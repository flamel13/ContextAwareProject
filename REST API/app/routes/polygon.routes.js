module.exports = (app) => {
    const polygon = require('../controllers/polygon.controller.js');

    // Create a new Discovered object
    app.post('/polygon', polygon.create);

    app.get('/polygon/:polygonid', polygon.search);
}
