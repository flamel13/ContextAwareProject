const Discovered = require('../models/discovered.model.js');

// Create and Save a new discovered object
exports.create = (req, res) => {
  // Validate request
    if(!req.body.characteristics) {
        return res.status(400).send({
            message: "Discovered object characteristics can not be empty"
        });
    }

    const discover_coordinates = {
      type: 'Point',
      coordinates: [req.body.longitude, req.body.latitude]
    };

    // Create a Discovered Object
    const discoveredObject = new Discovered({
        name: req.body.name || "Untitled Discovered Object",
        characteristics: req.body.characteristics,
        location: discover_coordinates
    });

    // Save Discovered Object in the database
    discoveredObject.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Discovered Object."
        });
    });
};

// Retrieve and return all discovered objects from the database.
exports.findAll = (req, res) => {
  Discovered.find()
  .then(discovered_objects => {
      res.send(discovered_objects);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving objects."
      });
  });
};

// Find a single note with a discoveredId
exports.findGeoQuery = (req, res) => {
  var distance = req.params.dist;
  var longitude = req.params.lon;
  var latitude = req.params.lat;
  Discovered.find({
    location: {
     $near: {
      $maxDistance: distance, //distance in meters
      $geometry: {
       type: "Point",
       coordinates: [longitude, latitude]
      }
     }
    }
   }).find((error, results) => {
    if (error) console.log(error);
    var reformattedArray = results.map(function(obj) {
       var rObj = {
         title: obj.name,
         coordinates: {
           latitude: obj.location.coordinates[1],
           longitude: obj.location.coordinates[0]
         },
         description: obj.characteristics
       };
       return rObj;
    });

    res.send(reformattedArray);
   });
};

// Update a object identified by the discoveredId in the request
exports.findClusters = (req, res) => {
  var distance = req.params.dist;
  var longitude = req.params.lon;
  var latitude = req.params.lat;
  Discovered.find({
    location: {
     $near: {
      $maxDistance: distance, //distance in meters
      $geometry: {
       type: "Point",
       coordinates: [longitude, latitude]
      }
     }
    }
   }).find((error, results) => {
    if (error) console.log(error);
    var reformattedArray = results.map(function(obj) {
       var rObj = {
         lat: obj.location.coordinates[1],
         lon: obj.location.coordinates[0]
       };
       return rObj;
    });

    res.send(reformattedArray);
   });
};

// Update a object identified by the discoveredId in the request
exports.findOne = (req, res) => {

};

// Update a object identified by the discoveredId in the request
exports.update = (req, res) => {

};

// Delete a object with the specified discoveredId in the request
exports.delete = (req, res) => {
  Discovered.findByIdAndRemove(req.params.discoveredId)
  .then(discovered_object => {
      if(!discovered_object) {
          return res.status(404).send({
              message: "Object not found with id " + req.params.discoveredId
          });
      }
      res.send({message: "Object deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Object not found with id " + req.params.discoveredId
          });
      }
      return res.status(500).send({
          message: "Could not delete discovered_object with id " + req.params.discoveredId
      });
  });
};
