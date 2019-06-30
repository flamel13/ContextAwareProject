const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const PolygonSchema = mongoose.Schema({
    location: {
     type: { type: String },
     coordinates: Array
    }
});

PolygonSchema.index({ location: "2dsphere" });
module.exports = mongoose.model('Polygon', PolygonSchema);
