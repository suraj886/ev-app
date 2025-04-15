const Booking = require('../models/Booking');
const Station = require('../models/Station');
const User = require('../models/User');

// Create a new booking
exports.createBooking = async (req, res) => {
    try {
        const { stationId, startTime, endTime, connectorType } = req.body;
        const userId = req.user.userId;

        // Check if station exists
        const station = await Station.findById(stationId);
        if (!station) {
            return res.status(404).json({ message: 'Station not found' });
        }

        // Check if station is at capacity
        if (station.currentUsers >= station.maxCapacity) {
            return res.status(400).json({ message: 'Station is at full capacity' });
        }

        // Check if connector type is available
        const connector = station.connectors.find(c => c.type === connectorType);
        if (!connector || connector.status !== 'available') {
            return res.status(400).json({ message: 'Selected connector type is not available' });
        }

        // Calculate total price
        const hours = (new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60);
        const totalPrice = hours * station.pricePerHour;

        // Create booking
        const booking = new Booking({
            user: userId,
            station: stationId,
            startTime,
            endTime,
            connectorType,
            totalPrice
        });

        await booking.save();

        // Update station's current users count
        station.currentUsers += 1;
        await station.save();

        // Update user's bookings
        await User.findByIdAndUpdate(userId, {
            $push: { bookings: booking._id }
        });

        res.status(201).json({
            message: 'Booking created successfully',
            booking
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user's bookings
exports.getUserBookings = async (req, res) => {
    try {
        const userId = req.user.userId;
        const bookings = await Booking.find({ user: userId })
            .populate('station')
            .sort({ startTime: -1 });

        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const userId = req.user.userId;

        const booking = await Booking.findOne({
            _id: bookingId,
            user: userId
        });

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        if (booking.status === 'cancelled') {
            return res.status(400).json({ message: 'Booking is already cancelled' });
        }

        // Update booking status
        booking.status = 'cancelled';
        await booking.save();

        // Update station's current users count
        const station = await Station.findById(booking.station);
        station.currentUsers -= 1;
        await station.save();

        res.json({ message: 'Booking cancelled successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get station bookings (for manager)
exports.getStationBookings = async (req, res) => {
    try {
        const userId = req.user.userId;
        
        // Get the station managed by the user
        const user = await User.findById(userId);
        if (!user.managedStation) {
            return res.status(403).json({ message: 'You are not a manager of any station' });
        }

        const bookings = await Booking.find({ station: user.managedStation })
            .populate('user', 'name email phone')
            .sort({ startTime: -1 });

        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 