const express = require('express');
const http = require('http');
const cors = require('cors');
const connectDB = require('./config/db');
const socketServer = require('./socketServer');
const authRoutes = require('./routes/auth');
const analyticsRoutes = require('./routes/analytics'); 
const onboardingRoutes = require('./routes/onboarding'); 

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

connectDB(); // Connect to MongoDB
socketServer(server); // Attach Socket.io

// (Optional REST route)
app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/onboarding', onboardingRoutes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
