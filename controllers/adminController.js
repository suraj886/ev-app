const Station = require('../models/Station');
const User = require('../models/User');

// Create a new station
exports.createStation = async (req, res) => {
    try {
        const station = new Station(req.body);
        await station.save();
        res.status(201).json({
            message: 'Station created successfully',
            station
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a station
exports.updateStation = async (req, res) => {
    try {
        const { id } = req.params;
        const station = await Station.findByIdAndUpdate(id, req.body, { new: true });
        if (!station) {
            return res.status(404).json({ message: 'Station not found' });
        }
        res.json({
            message: 'Station updated successfully',
            station
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
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

// Assign manager to station
exports.assignManager = async (req, res) => {
    try {
        const { stationId, managerId } = req.body;

        // Check if station exists
        const station = await Station.findById(stationId);
        if (!station) {
            return res.status(404).json({ message: 'Station not found' });
        }

        // Check if user exists and is a manager
        const manager = await User.findById(managerId);
        if (!manager || manager.role !== 'manager') {
            return res.status(400).json({ message: 'Invalid manager' });
        }

        // Check if manager is already assigned to another station
        if (manager.managedStation && manager.managedStation.toString() !== stationId) {
            return res.status(400).json({ message: 'Manager is already assigned to another station' });
        }

        // Update station's manager
        station.manager = managerId;
        await station.save();

        // Update manager's managed station
        manager.managedStation = stationId;
        await manager.save();

        res.json({
            message: 'Manager assigned successfully',
            station,
            manager
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove manager from station
exports.removeManager = async (req, res) => {
    try {
        const { stationId } = req.params;

        // Check if station exists
        const station = await Station.findById(stationId);
        if (!station) {
            return res.status(404).json({ message: 'Station not found' });
        }

        if (!station.manager) {
            return res.status(400).json({ message: 'No manager assigned to this station' });
        }

        // Remove manager from station
        const managerId = station.manager;
        station.manager = undefined;
        await station.save();

        // Remove station from manager
        await User.findByIdAndUpdate(managerId, {
            $unset: { managedStation: 1 }
        });

        res.json({ message: 'Manager removed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all stations with their managers
exports.getAllStations = async (req, res) => {
    try {
        const stations = await Station.find()
            .populate('manager', 'name email phone')
            .sort({ createdAt: -1 });
        res.json(stations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 