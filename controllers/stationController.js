const Station = require('../models/Station');

// Get all stations
exports.getAllStations = async (req, res) => {
    try {
        const stations = await Station.find();
        res.json(stations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get nearby stations
exports.getNearbyStations = async (req, res) => {
    try {
        const { lat, lng, radius = 50 } = req.query;

        if (!lat || !lng) {
            return res.status(400).json({ message: 'Latitude and longitude are required' });
        }

        // Convert radius from km to meters (MongoDB uses meters)
        const maxDistance = radius * 1000;

        const stations = await Station.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [parseFloat(lng), parseFloat(lat)]
                    },
                    $maxDistance: maxDistance
                }
            }
        });

        // Add distance to each station
        const stationsWithDistance = stations.map(station => {
            const distance = calculateDistance(
                parseFloat(lat),
                parseFloat(lng),
                station.location.coordinates[1],
                station.location.coordinates[0]
            );
            return {
                ...station.toObject(),
                distance: parseFloat(distance.toFixed(2))
            };
        });

        // Sort by distance
        stationsWithDistance.sort((a, b) => a.distance - b.distance);

        res.json(stationsWithDistance);
    } catch (error) {
        console.error('Error in getNearbyStations:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get stations by city
exports.getStationsByCity = async (req, res) => {
    try {
        const { city } = req.params;
        const stations = await Station.find({
            city: { $regex: new RegExp(city, 'i') }
        });
        res.json(stations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new station
exports.createStation = async (req, res) => {
    try {
        const station = new Station({
            ...req.body,
            location: {
                type: 'Point',
                coordinates: [req.body.lng, req.body.lat]
            }
        });
        
        const newStation = await station.save();
        res.status(201).json(newStation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a station
exports.updateStation = async (req, res) => {
    try {
        const { id } = req.params;
        const station = await Station.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true }
        );
        
        if (!station) {
            return res.status(404).json({ message: 'Station not found' });
        }
        
        res.json(station);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a station
exports.deleteStation = async (req, res) => {
    try {
        const { id } = req.params;
        const station = await Station.findByIdAndDelete(id);
        
        if (!station) {
            return res.status(404).json({ message: 'Station not found' });
        }
        
        res.json({ message: 'Station deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Helper function to calculate distance between two points
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
} 