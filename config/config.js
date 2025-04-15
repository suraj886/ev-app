require('dotenv').config();

module.exports = {
    port: process.env.PORT || 8080,
    cors: {
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    },
    database: {
        url: process.env.DATABASE_URL || 'mongodb://localhost:27017/ev_charging'
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'your-secret-key',
        expiresIn: '24h'
    }
}; 