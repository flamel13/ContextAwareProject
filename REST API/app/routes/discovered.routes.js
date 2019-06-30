module.exports = (app) => {
    const discovered = require('../controllers/discovered.controller.js');

    // Create a new Discovered object
    app.post('/discovered', discovered.create);

    // Retrieve all discovered objects
    app.get('/discovered', discovered.findAll);

    // Retrieve a single Discovered object with noteId
    app.get('/discovered/:dist?/:lon?/:lat?', discovered.findGeoQuery);

    // Retrieve a single Discovered object with noteId
    app.get('/discoveredcluster/:dist?/:lon?/:lat?/', discovered.findClusters);

    // Retrieve a single Discovered object with noteId
    app.get('/discovered/:discoveredId', discovered.findOne);

    // Update a Discovered object with discoveredId
    app.put('/discovered/:discoveredId', discovered.update);

    // Delete a Discovered object with discoveredId
    app.delete('/discovered/:discoveredId', discovered.delete);
}
