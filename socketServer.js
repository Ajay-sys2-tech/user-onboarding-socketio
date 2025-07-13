// const { Server } = require('socket.io');
// const onboardingSocket = require('./sockets/onboarding');

// module.exports = (server) => {
//   const io = new Server(server, {
//     cors: { origin: '*' },
//   });

//   io.on('connection', (socket) => {
//     console.log('User connected:', socket.id);
//     onboardingSocket(socket); // Attach onboarding logic
//   });
// };


const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const onboardingSocket = require('./sockets/onboarding');

module.exports = (server) => {
  const io = new Server(server, {
    cors: { origin: '*' },
  });

  // Authentication middleware
  io.use((socket, next) => {
    // const token = socket.handshake.auth.token;
    const token = socket.handshake.headers.token;
    if (!token) return next(new Error('Authentication error'));

    try {
      const decoded = jwt.verify(token, process.env.USER_JWT_SECRET);
      socket.userId = decoded.id;
      next();
    } catch (err) {
      return next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.userId);
    onboardingSocket(socket); // Pass authenticated socket
  });
};
