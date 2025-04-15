// const mongoose = require('mongoose');
// const Station = require('../models/Station');

// // Sample stations data
// const stations = [
//     {
//         id: "gaya1",
//         name: "Gaya Central EV Charge",
//         address: "MG Road, Gaya, Bihar",
//         location: {
//             type: "Point",
//             coordinates: [85.0002, 24.7914] // Note: MongoDB expects [longitude, latitude]
//         },
//         rating: 4.0,
//         image: "https://images.unsplash.com/photo-1593941707882-a5bfb1050f95?q=80&w=1000&auto=format&fit=crop",
//         soc: 65,
//         availability: true,
//         price: 13.5,
//         city: "Gaya"
//     },
//     {
//         id: "gaya2",
//         name: "Bodhgaya EV Station",
//         address: "Near Mahabodhi Temple, Bodhgaya",
//         location: {
//             type: "Point",
//             coordinates: [84.9923, 24.6961]
//         },
//         rating: 4.5,
//         image: "https://images.unsplash.com/photo-1647500673934-5c5aff40ca1d?q=80&w=1000&auto=format&fit=crop",
//         soc: 78,
//         availability: false,
//         price: 15.0,
//         city: "Gaya"
//     },
//     {
//         id: "patna1",
//         name: "Patna Electric Chargers",
//         address: "Gandhi Maidan, Patna, Bihar",
//         location: {
//             type: "Point",
//             coordinates: [85.1503, 25.6130]
//         },
//         rating: 3.9,
//         image: "https://images.unsplash.com/photo-1662948291101-69c9643ff3ea?q=80&w=1000&auto=format&fit=crop",
//         soc: 90,
//         availability: true,
//         price: 11.75,
//         city: "Patna"
//     },
//     {
//         id: "patna2",
//         name: "Bihar EV Hub",
//         address: "Patna Junction, Patna",
//         location: {
//             type: "Point",
//             coordinates: [85.1376, 25.5941]
//         },
//         rating: 4.3,
//         image: "https://images.unsplash.com/photo-1655400930864-e57269accc54?q=80&w=1000&auto=format&fit=crop",
//         soc: 60,
//         availability: true,
//         price: 12.0,
//         city: "Patna"
//     },
//     {
//         id: "patna3",
//         name: "Patna Green Energy",
//         address: "Kankarbagh, Patna, Bihar",
//         location: {
//             type: "Point",
//             coordinates: [85.1714, 25.5877]
//         },
//         rating: 3.7,
//         image: "https://images.unsplash.com/photo-1629762972576-625ae8bae031?q=80&w=1000&auto=format&fit=crop",
//         soc: 45,
//         availability: true,
//         price: 10.8,
//         city: "Patna"
//     },
//     {
//         id: "delhi1",
//         name: "Connaught Place EV Station",
//         address: "Connaught Place, New Delhi",
//         location: {
//             type: "Point",
//             coordinates: [77.2167, 28.6315]
//         },
//         rating: 4.4,
//         image: "https://images.unsplash.com/photo-1647010114013-aae5e3e660a3?q=80&w=1000&auto=format&fit=crop",
//         soc: 88,
//         availability: true,
//         price: 16.5,
//         city: "Delhi"
//     },
//     {
//         id: "delhi2",
//         name: "Delhi NCR Charging Hub",
//         address: "Rajiv Chowk, New Delhi",
//         location: {
//             type: "Point",
//             coordinates: [77.2270, 28.6268]
//         },
//         rating: 4.1,
//         image: "https://images.unsplash.com/photo-1634224143538-ce0221abf182?q=80&w=1000&auto=format&fit=crop",
//         soc: 75,
//         availability: true,
//         price: 15.0,
//         city: "Delhi"
//     },
//     {
//         id: "delhi3",
//         name: "NDMC EV Charging Point",
//         address: "India Gate, New Delhi",
//         location: {
//             type: "Point",
//             coordinates: [77.2295, 28.6129]
//         },
//         rating: 4.6,
//         image: "https://images.unsplash.com/photo-1655489661223-9ef45at6446f?q=80&w=1000&auto=format&fit=crop",
//         soc: 92,
//         availability: true,
//         price: 14.5,
//         city: "Delhi"
//     },
//     {
//         id: "delhi4",
//         name: "Delhi Metro EV Station",
//         address: "Kashmere Gate, Delhi",
//         location: {
//             type: "Point",
//             coordinates: [77.2307, 28.6671]
//         },
//         rating: 3.9,
//         image: "https://images.unsplash.com/photo-1631990170048-2101f3192039?q=80&w=1000&auto=format&fit=crop",
//         soc: 55,
//         availability: false,
//         price: 13.8,
//         city: "Delhi"
//     }
// ];

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/ev_stations', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(async () => {
//     console.log('Connected to MongoDB');
    
//     // Clear existing stations
//     await Station.deleteMany({});
//     console.log('Cleared existing stations');
    
//     // Insert new stations one by one to catch any errors
//     for (const station of stations) {
//         try {
//             const newStation = new Station(station);
//             await newStation.save();
//             console.log(`Successfully saved station: ${station.name}`);
//         } catch (error) {
//             console.error(`Error saving station ${station.name}:`, error);
//         }
//     }
    
//     process.exit(0);
// })
// .catch(err => {
//     console.error('Connection error:', err);
//     process.exit(1);
// }); 