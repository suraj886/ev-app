const express = require('express');
const cors = require('cors');
const stationsData = require('./data/stations');

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0'; // Listen on all network interfaces

// Enable CORS for all routes
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to EV Charging Station API' });
});

// Get all stations
app.get('/api/stations', (req, res) => {
  console.log(`Returning ${stationsData.length} stations`);
  console.log(`HII we are here`);
  res.json(stationsData);
});

// Get nearby stations (within radius km)
// app.get('/api/stations/nearby', (req, res) => {
//   const { latitude, longitude, radius = 50 } = req.query;
  
//   console.log(`Nearby search: lat=${latitude}, lon=${longitude}, radius=${radius}km`);
  
//   if (!latitude || !longitude) {
//     return res.status(400).json({ message: 'Latitude and longitude are required' });
//   }
  
//   // Calculate distance using Haversine formula
//   const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
//     const R = 6371; // Radius of the earth in km
//     const dLat = deg2rad(lat2 - lat1);
//     const dLon = deg2rad(lon2 - lon1);
//     const a = 
//       Math.sin(dLat/2) * Math.sin(dLat/2) +
//       Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
//       Math.sin(dLon/2) * Math.sin(dLon/2); 
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
//     const distance = R * c; // Distance in km
//     return distance;
//   };

//   const deg2rad = (deg) => {
//     return deg * (Math.PI/180);
//   };
  
//   // Filter stations by distance
//   const nearbyStations = stationsData
//     .map(station => {
//       const distance = getDistanceFromLatLonInKm(
//         parseFloat(latitude), 
//         parseFloat(longitude), 
//         station.location.latitude, 
//         station.location.longitude
//       );
//       return { ...station, distance };
//     })
//     .filter(station => station.distance <= parseFloat(radius))
//     .sort((a, b) => a.distance - b.distance);
  
//   console.log(`Found ${nearbyStations.length} stations within ${radius}km`);
//   res.json(nearbyStations);
// });

// Get nearby stations (within radius km)
app.get('/api/stations/nearby', (req, res) => {
  const { lat, lng, radius = 50 } = req.query;

  console.log(`Nearby search: lat=${lat}, lon=${lng}, radius=${radius}km`);

  if (!lat || !lng) {
    return res.status(400).json({ message: 'Latitude and longitude are required' });
  }

  // Calculate distance using Haversine formula
  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  // Filter stations by distance
  const nearbyStations = stationsData
    .map(station => {
      const distance = getDistanceFromLatLonInKm(
        parseFloat(lat),
        parseFloat(lng),
        station.location.latitude,
        station.location.longitude
      );
      return { ...station, distance };
    })
    .filter(station => station.distance <= parseFloat(radius))
    .sort((a, b) => a.distance - b.distance);

  console.log(`Found ${nearbyStations.length} stations within ${radius}km`);
  res.json(nearbyStations);
});


// Get stations by city - IMPORTANT: This needs to come BEFORE the :id route
app.get('/api/stations/city/:city', (req, res) => {
  const city = req.params.city;
  console.log(`Searching for stations in city: ${city}`);
  
  const cityStations = stationsData.filter(
    station => station.city.toLowerCase() === city.toLowerCase()
  );
  
  console.log(`Found ${cityStations.length} stations in ${city}`);
  
  if (cityStations.length === 0) {
    return res.status(404).json({ message: `No stations found in ${city}` });
  }
  
  res.json(cityStations);
});

// Get station by ID - This generic route comes AFTER specific routes
app.get('/api/stations/:id', (req, res) => {
  const id = req.params.id;
  const station = stationsData.find(s => s.id === id);
  
  if (!station) {
    console.log(`Station with ID ${id} not found`);
    return res.status(404).json({ message: 'Station not found' });
  }
  
  console.log(`Returning station: ${station.name}`);
  res.json(station);
});

// Start the server
app.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
  console.log(`For local access: http://localhost:${PORT}`);
  console.log(`For network access: http://192.168.1.43:${PORT}`);
}); 