const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const Station = require('../models/Station');
const Booking = require('../models/Booking');

// Get manager dashboard statistics
router.get('/stats', protect, authorize('manager'), async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const stats = {
            totalStations: await Station.countDocuments({ manager: req.user.id }),
            activeBookings: await Booking.countDocuments({ 
                station: { $in: await Station.find({ manager: req.user.id }).select('_id') },
                status: 'active'
            }),
            todayBookings: await Booking.countDocuments({
                station: { $in: await Station.find({ manager: req.user.id }).select('_id') },
                startTime: { $gte: today }
            }),
            revenue: await Booking.aggregate([
                {
                    $match: {
                        station: { $in: await Station.find({ manager: req.user.id }).select('_id') },
                        startTime: { $gte: today }
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: '$amount' }
                    }
                }
            ]).then(result => result[0]?.total || 0)
        };

        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get managed stations
router.get('/stations', protect, authorize('manager'), async (req, res) => {
    try {
        const stations = await Station.find({ manager: req.user.id });
        res.json(stations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update station status
router.put('/stations/:id/status', protect, authorize('manager'), async (req, res) => {
    try {
        const station = await Station.findOne({ 
            _id: req.params.id,
            manager: req.user.id 
        });
        
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

// Get station bookings
router.get('/bookings', protect, authorize('manager'), async (req, res) => {
    try {
        const stations = await Station.find({ manager: req.user.id }).select('_id');
        const bookings = await Booking.find({
            station: { $in: stations }
        }).populate('user', 'name email')
          .populate('station', 'name address');
        
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update booking status
router.put('/bookings/:id/status', protect, authorize('manager'), async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('station', 'manager');
        
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        if (booking.station.manager.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        booking.status = req.body.status;
        await booking.save();
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 