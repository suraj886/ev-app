const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const User = require('../models/User');
const Station = require('../models/Station');

// Get admin dashboard statistics
router.get('/stats', protect, authorize('admin'), async (req, res) => {
    try {
        const stats = {
            totalUsers: await User.countDocuments(),
            totalStations: await Station.countDocuments(),
            totalBookings: await Booking.countDocuments(),
            activeBookings: await Booking.countDocuments({ status: 'active' })
        };
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// console.log("admin route");
// Get all users
router.get('/users', protect, authorize('admin'), async (req, res) => {
    try {
        const users = await User.find().select('-googleId');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update user role
router.put('/users/:id/role', protect, authorize('admin'), async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.role = req.body.role;
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all stations
router.get('/stations', protect, authorize('admin'), async (req, res) => {
    try {
        const stations = await Station.find();
        res.json(stations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update station status
router.put('/stations/:id/status', protect, authorize('admin'), async (req, res) => {
    try {
        const station = await Station.findById(req.params.id);
        if (!station) {
            return res.status(404).json({ message: 'Station not found' });
        }
        station.status = req.body.status;
        await station.save();
        res.json(station);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 