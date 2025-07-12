const mongoose = require('mongoose');
const Question = require('../models/Question'); // Adjust the path as needed
const dotenv = require('dotenv');
dotenv.config();

const MONGODB_URI = process.env.MONGO_URI || "mongodb://localhost:27017/chat-onboarding";

const questions = [
  {
    text: "Let's say in a few weeks, you're sleeping well. What would change?",
    type: 'choice',
    options: [
      'I would go to sleep easily',
      'I would sleep through the night',
      "I'd wake up on time, refreshed",
    ],
    order: 1,
  },
  {
    text: "That's a great goal. How long have you been struggling with sleep?",
    type: 'choice',
    options: ['less than 2 weeks', '2 to 8 weeks', 'More than 8 weeks'],
    order: 2,
  },
  {
    text: 'What time do you go to bed for sleep?',
    type: 'time',
    options: [],
    order: 3,
  },
  {
    text: 'What time do you get out of bed to start your day?',
    type: 'time',
    options: [],
    order: 4,
  },
  {
    text: 'Ok. How many hours sleep do you get in  a typical night?',
    type: 'number',
    options: [],
    order: 5,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    const count = await Question.countDocuments();
    if (count > 0) {
      await mongoose.connection.dropCollection('questions');
      console.log('Dropped existing `questions` collection');
    }

    await Question.insertMany(questions);
    console.log('Inserted new questions');
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit();
  }
}

seed();
