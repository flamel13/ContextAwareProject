const Polygon = require('../models/polygon.model.js');
const Discovered = require('../models/discovered.model.js');

// Create and Save a new discovered object
exports.create = (req, res) => {

    response = req.body.coordinates;

    console.log(response)

    polygon_array = []

    response.map(function(o) {
      polygon_array.push([o.longitude, o.latitude])
    });

    polygon_array.push(polygon_array[0])

    const discover_coordinates = {
      type: 'Polygon',
      coordinates: [ polygon_array ]
    };

    // Create a Discovered Object
    const discoveredObject = new Polygon({
        location: discover_coordinates
    });

    console.log(discoveredObject)

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


exports.search = (req, res) => {

  var id = req.params.polygonid

  Polygon.findOne({_id: id}).then(result => {
    console.log(result.location.coordinates)
    let query = {
      location:
       {
         $geoWithin:
         {
           $geometry: {
             type: "Polygon",
             coordinates: result.location.coordinates
           }
         }
       }
     };

    Discovered.find(query).then(result => {
      console.log(result)
      res.send(result)
    })
  })
}
