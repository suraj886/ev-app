const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  totalRatings: {
    type: Number,
    default: 0
  },
  is24Hours: {
    type: Boolean,
    default: false
  },
  isFastCharging: {
    type: Boolean,
    default: false
  },
  // Maximum number of simultaneous users
  maxCapacity: {
    type: Number,
    default: 5
  },
  // Current number of active bookings
  currentUsers: {
    type: Number,
    default: 0
  },
  // Manager assigned to this station
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  connectors: [{
    type: {
      type: String,
      required: true
    },
    power: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['available', 'in_use', 'maintenance'],
      default: 'available'
    }
  }],
  photos: [{
    url: String,
    description: String
  }],
  // Operating hours
  operatingHours: {
    open: {
      type: String,
      required: true
    },
    close: {
      type: String,
      required: true
    }
  },
  // Price per hour
  pricePerHour: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

// Create geospatial index
stationSchema.index({ location: '2dsphere' });

// Update the updatedAt field before saving
stationSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Station', stationSchema); 