const mongoose = require('mongoose');
const User = require('../models/User'); 
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const MONGODB_URI = process.env.MONGO_URI || "mongodb://localhost:27017/chat-onboarding";

const users = [
  { username: 'user1', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 3 },
  { username: 'user2', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: -1 },
  { username: 'user3', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 0 },
  { username: 'user4', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 5 },
  { username: 'user5', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 2 },
  { username: 'user6', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 4 },
  { username: 'user7', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 1 },
  { username: 'user8', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 3 },
  { username: 'user9', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: -1 },
  { username: 'user10', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 0 },
  { username: 'user11', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 4 },
  { username: 'user12', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 1 },
  { username: 'user13', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 2 },
  { username: 'user14', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 3 },
  { username: 'user15', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 5 },
  { username: 'user16', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 0 },
  { username: 'user17', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 2 },
  { username: 'user18', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 4 },
  { username: 'user19', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: -1 },
  { username: 'user20', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 5 },
  { username: 'user21', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 0 },
  { username: 'user22', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 3 },
  { username: 'user23', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 1 },
  { username: 'user24', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 2 },
  { username: 'user25', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: -1 },
  { username: 'user26', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 1 },
  { username: 'user27', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 0 },
  { username: 'user28', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 3 },
  { username: 'user29', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 4 },
  { username: 'user30', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 5 },
  { username: 'user31', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 0 },
  { username: 'user32', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 1 },
  { username: 'user33', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 2 },
  { username: 'user34', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 4 },
  { username: 'user35', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 5 },
  { username: 'user36', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: -1 },
  { username: 'user37', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 3 },
  { username: 'user38', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 1 },
  { username: 'user39', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 2 },
  { username: 'user40', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 0 },
  { username: 'user41', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: -1 },
  { username: 'user42', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 5 },
  { username: 'user43', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 2 },
  { username: 'user44', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 3 },
  { username: 'user45', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 1 },
  { username: 'user46', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 4 },
  { username: 'user47', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 0 },
  { username: 'user48', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: -1 },
  { username: 'user49', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 5 },
  { username: 'user50', password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PyqAIfJ1yXr.VcOgY9sKOPQ2xewvGa', chatStatus: 3 }
];


async function seed() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // const count = await User.countDocuments();
    // if (count > 0) {
    //   await mongoose.connection.dropCollection('questions');
    //   console.log('Dropped existing `questions` collection');
    // }

    await User.insertMany(users);
    console.log('Inserted new users');
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit();
  }
}

seed();
