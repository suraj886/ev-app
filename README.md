# EV Charging Station Backend

This is a simple backend server for the EV Charging Station App. It serves dummy data for charging stations in Trichy, Gaya, Patna, and Delhi.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

Or run in development mode with automatic restart:

```bash
npm run dev
```

The server will start on port 5000 by default.

## API Endpoints

### Get all stations
```
GET /api/stations
```

### Get stations by city
```
GET /api/stations/city/:city
```
Example: `/api/stations/city/Delhi`

### Get station by ID
```
GET /api/stations/:id
```
Example: `/api/stations/trichy1`

### Get nearby stations
```
GET /api/stations/nearby?latitude=28.6129&longitude=77.2295&radius=50
```
Parameters:
- `latitude` (required): User's latitude
- `longitude` (required): User's longitude  
- `radius` (optional): Search radius in kilometers (default: 50)

## Data Structure

Each station includes:
- `id`: Unique identifier
- `name`: Station name
- `address`: Full address
- `location`: Latitude and longitude
- `rating`: Rating out of 5
- `image`: URL to station image
- `soc`: State of Charge percentage
- `availability`: Whether the station is available
- `price`: Cost per kWh in INR
- `city`: City name (Trichy, Gaya, Patna, or Delhi)

When using the nearby endpoint, stations also include a `distance` field showing kilometers from the provided coordinates. 