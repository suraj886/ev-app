// Dummy database for EV charging stations
const stationsData = [
  // Trichy Stations
  {
    id: "trichy1",
    name: "Trichy EV Charging Hub",
    address: "Anna Nagar, Tiruchirappalli, Tamil Nadu",
    location: {
      latitude: 10.7905,
      longitude: 78.7047
    },
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1558389186-438424b00a32?q=80&w=1000&auto=format&fit=crop",
    soc: 85, // State of Charge percentage
    availability: true, // Is the station available
    price: 12.5, // Price per kWh in INR
    city: "Trichy"
  },
  {
    id: "trichy2",
    name: "BHEL EV Charging Station",
    address: "BHEL Township, Tiruchirappalli, Tamil Nadu",
    location: {
      latitude: 10.8105,
      longitude: 78.6965
    },
    rating: 3.8,
    image: "https://images.unsplash.com/photo-1567949828871-19f8dea7a1da?q=80&w=1000&auto=format&fit=crop",
    soc: 72,
    availability: true,
    price: 14.0,
    city: "Trichy"
  },
  {
    id: "trichy3",
    name: "NIT Trichy EV Point",
    address: "National Institute of Technology, Tiruchirappalli",
    location: {
      latitude: 10.7589,
      longitude: 78.8132
    },
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1633540640466-d3014b2a5c8f?q=80&w=1000&auto=format&fit=crop",
    soc: 95,
    availability: true,
    price: 10.2,
    city: "Trichy"
  },

  // Gaya Stations
  {
    id: "gaya1",
    name: "Gaya Central EV Charge",
    address: "MG Road, Gaya, Bihar",
    location: {
      latitude: 24.7914,
      longitude: 85.0002
    },
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1593941707882-a5bfb1050f95?q=80&w=1000&auto=format&fit=crop",
    soc: 65,
    availability: true,
    price: 13.5,
    city: "Gaya"
  },
  {
    id: "gaya2",
    name: "Bodhgaya EV Station",
    address: "Near Mahabodhi Temple, Bodhgaya",
    location: {
      latitude: 24.6961,
      longitude: 84.9923
    },
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1647500673934-5c5aff40ca1d?q=80&w=1000&auto=format&fit=crop",
    soc: 78,
    availability: false, // Currently unavailable
    price: 15.0,
    city: "Gaya"
  },

  // Patna Stations
  {
    id: "patna1",
    name: "Patna Electric Chargers",
    address: "Gandhi Maidan, Patna, Bihar",
    location: {
      latitude: 25.6130,
      longitude: 85.1503
    },
    rating: 3.9,
    image: "https://images.unsplash.com/photo-1662948291101-69c9643ff3ea?q=80&w=1000&auto=format&fit=crop",
    soc: 90,
    availability: true,
    price: 11.75,
    city: "Patna"
  },
  {
    id: "patna2",
    name: "Bihar EV Hub",
    address: "Patna Junction, Patna",
    location: {
      latitude: 25.5941,
      longitude: 85.1376
    },
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1655400930864-e57269accc54?q=80&w=1000&auto=format&fit=crop",
    soc: 60,
    availability: true,
    price: 12.0,
    city: "Patna"
  },
  {
    id: "patna3",
    name: "Patna Green Energy",
    address: "Kankarbagh, Patna, Bihar",
    location: {
      latitude: 25.5877,
      longitude: 85.1714
    },
    rating: 3.7,
    image: "https://images.unsplash.com/photo-1629762972576-625ae8bae031?q=80&w=1000&auto=format&fit=crop",
    soc: 45,
    availability: true,
    price: 10.8,
    city: "Patna"
  },

  // Delhi Stations
  {
    id: "delhi1",
    name: "Connaught Place EV Station",
    address: "Connaught Place, New Delhi",
    location: {
      latitude: 28.6315,
      longitude: 77.2167
    },
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1647010114013-aae5e3e660a3?q=80&w=1000&auto=format&fit=crop",
    soc: 88,
    availability: true,
    price: 16.5,
    city: "Delhi"
  },
  {
    id: "delhi2",
    name: "Delhi NCR Charging Hub",
    address: "Rajiv Chowk, New Delhi",
    location: {
      latitude: 28.6268,
      longitude: 77.2270
    },
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1634224143538-ce0221abf182?q=80&w=1000&auto=format&fit=crop",
    soc: 75,
    availability: true,
    price: 15.0,
    city: "Delhi"
  },
  {
    id: "delhi3",
    name: "NDMC EV Charging Point",
    address: "India Gate, New Delhi",
    location: {
      latitude: 28.6129,
      longitude: 77.2295
    },
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1655489661223-9ef45at6446f?q=80&w=1000&auto=format&fit=crop",
    soc: 92,
    availability: true,
    price: 14.5,
    city: "Delhi"
  },
  {
    id: "delhi4",
    name: "Delhi Metro EV Station",
    address: "Kashmere Gate, Delhi",
    location: {
      latitude: 28.6671,
      longitude: 77.2307
    },
    rating: 3.9,
    image: "https://images.unsplash.com/photo-1631990170048-2101f3192039?q=80&w=1000&auto=format&fit=crop",
    soc: 55,
    availability: false,
    price: 13.8,
    city: "Delhi"
  }
];

module.exports = stationsData; 