const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const DiscoveredSchema = mongoose.Schema({
    name: String,
    characteristics: String,
    location: {
     type: { type: String },
     coordinates: []
    }
});

DiscoveredSchema.index({ location: "2dsphere" });
module.exports = mongoose.model('Discovered', DiscoveredSchema);
